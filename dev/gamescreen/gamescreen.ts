class GameScreen{

    private screenWidth: number
    private screenHeight: number
    private width: number = 150
    private height: number = 25
    private paddle:Paddle
    private ball: Ball
    private game:Game
    private foreground:Element
    private textfield: HTMLElement
    private score: Number = 0
    private highscore: number = 0
    private lifes: number = 3
    private balks : Balk[]

    public get getHighscore() : number {
        return this.highscore
    }

    public set Lifes(lifes : number){
        this.lifes = lifes 
    }
    

    constructor(g:Game, width:number, height:number){
        this.game = g
        
        let container = document.getElementsByTagName("container")[0]
        container.classList.replace("startbg", "gamebg")
    
        this.foreground = document.getElementsByTagName("foreground")[0]

        this.textfield = document.createElement("textfield")
        this.foreground.appendChild(this.textfield);

        this.screenWidth = width
        this.screenHeight = height
        this.paddle = new Paddle(0.5 * this.screenWidth - 0.5 * this.width, this.screenHeight - 70, this.width, this.height)
        this.ball = new Ball(this.screenWidth,this.screenHeight, 35, 35)

        this.balks = []

        for(let i = 0; i < 48; i++){ //create balks
            let balk = new Balk(0, 0, 156, 25)
            this.balks.push(balk)
            //balk.update()
        }
    }

    public update():void {
        this.paddle.update()
        this.ball.update()
        this.textfield.innerHTML = "SCORE: " +this.score+ " - LEVENS: " + this.lifes
      
        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.changeDirection()
        }

        for(let balk of this.balks) { // loop through all balks
            if (this.checkCollision(this.ball.getRectangle(), balk.getRectangle())) {
                balk.remove()
                this.ball.changeDirection()
                if(balk.Class == "purple"){
                    this.score =+ this.score + 10
                    this.paddle.Width = 150
                }
                if(balk.Class == "red"){
                    this.score =+ this.score + 10
                    this.paddle.Width = 100
                }
                if(balk.Class == "green"){
                    this.score =+ this.score + 10
                    this.paddle.Width = 50
                }
                if(balk.Class == "yellow"){
                    this.score =+ this.score + 25
                }
                if(balk.Class == "green"){
                    this.score =+ this.score + 50
                }
            }
        }

        if(this.ball.getY > 720) {
            this.ball.setX = 0.5 * this.screenWidth
            this.ball.setY = 0.5 * this.screenHeight
            this.ball.setSpeedX = 6 * (Math.floor(Math.random()*2) == 1 ? 1 : -1)
            this.lifes--
        }

        if (this.lifes == 0){    
            if(this.score > this.highscore){
                this.highscore == this.score
            }
            this.game.emptyScreen()
            this.game.showScreen(new GameOver(this.game, this))
        }
    }

    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

