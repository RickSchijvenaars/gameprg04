class GameScreen{

    private screenWidth: number
    private screenHeight: number
    private paddle:Paddle
    private ball: Ball
    private game:Game
    private foreground:Element
    private textfield: HTMLElement
    private score: number = 0
    private newHighscore : string
    private highscore: any = localStorage.getItem('highscore');
    private lifes: number = 3
    private balks : Balk[]

    public set Lifes(lifes : number){
        this.lifes = lifes 
    }

    public get balksArray() : Balk[] {
        return this.balks
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
        this.paddle = new Paddle(0.5 * this.screenWidth - 0.5 * 150, this.screenHeight - 70, 150, 25)
        this.ball = new Ball(this.screenWidth,this.screenHeight, 35, 35)

        this.balks = []
        this.createBalks()        
    }

    public createBalks():void{
        let positions: Array<number> = [160, 160, 160, 160, 320]
        let left = 2
        let top = 2
        for(let i = 0; i < 48; i++){ //create balks
            let xPos = positions[Math.floor(Math.random()*positions.length)]
            let balk = new Balk(this, left, top, 156, 25)
            left = left + xPos

            if(left > 1280){
                top = top + 29
                left = 2
            }

            this.balks.push(balk)
        }
    }

    public update():void {
        this.paddle.update()
        this.ball.update()
        this.textfield.innerHTML = "SCORE: " +this.score+ " - LEVENS: " + this.lifes
      
        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.changeSpeed()
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

        if(this.balks.length == 0){
            this.ball.setX = 0.5 * this.screenWidth
            this.ball.setY = 0.5 * this.screenHeight
            this.ball.setSpeedX = 6 * (Math.floor(Math.random()*2) == 1 ? 1 : -1)
            this.createBalks()
        }

        if (this.lifes == 0){    
            if(this.score > this.highscore){
                this.newHighscore = this.score.toString()
                localStorage.setItem('highscore', this.newHighscore);
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

