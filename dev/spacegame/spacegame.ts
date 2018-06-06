class SpaceGame {
    
    public asteroids: Asteroid[] //array for asteroids
    private spaceship: Spaceship
    private background: Background
    private lasers : Laser[]
    private textfield : HTMLElement
    private levens:number = 3   
    private time:number = 0
    private game:Game
    private foreground:Element
    private afstand:number = 200000000

    public get Time() : number {
        return this.time
    }

    constructor(g:Game){
        this.game = g
        this.background = new Background() //create background
        this.spaceship = new Spaceship(this) //create spaceship

        this.foreground = document.getElementsByTagName("foreground")[0]
        this.textfield = document.createElement("textfield")
        this.foreground.appendChild(this.textfield);

        this.asteroids = []
        this.lasers = []

        for(let i = 0; i < 6; i++){ //create asteroids
            let asteroid = new Asteroid(this)            
            this.asteroids.push(asteroid)
            asteroid.update()
        }
    }  

    public update():void{
        this.spaceship.update()
        this.textfield.innerHTML = "LEVENS: " +this.levens + " -  AFSTAND: " +this.afstand + "km"
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;")
        for(let l of this.lasers) { // loop door alle asteroids in de array - roep update aan
            l.update()
        }

        for(let asteroid of this.asteroids) { // loop door alle asteroids in de array - roep update aan
            asteroid.update()

           
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset()
                if(this.levens > 0) {
                    this.levens--
                }
                console.log("ship hits asteroid")
            }

            for(let las of this.lasers) { // loop door alle asteroids in de array - roep update aan
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers")
                    asteroid.reset()
                    las.remove()
                }
            }
        }

        if (this.levens == 0){    
            this.game.emptyScreen()
            this.game.showScreen(new GameOver(this.game))
        }

        if (this.time == 2000){
            this.textfield.innerHTML = "GEHAALD"
            this.textfield.setAttribute("style", "font-size:30px")
        }

        this.time++
        this.afstand = this.afstand - 20000
        this.background.loop()      
    }

    public addLaser(l:Laser){
        this.lasers.push(l)
    }


    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }    
}  