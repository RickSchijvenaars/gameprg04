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
    private balks : Balk[]

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
        this.textfield.innerHTML = "SCORE: " +this.score

        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.changeDirection()
        }
    }

    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

