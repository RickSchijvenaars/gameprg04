/// <reference path="gameobject.ts" />

class Ball extends GameObject {
    
    private speedX : number
    private speedY : number
    private screenWidth : number

    public get getY() : number {
        return this.yPos
    }

    public set setY(y : number){
        this.yPos = y
    }

    public set setX(x : number){
        this.xPos = x
    }

    public set setSpeedX(speed : number){
        this.speedX = speed
    }
    
    
    
    constructor(screenWidth : number, screenHeight : number, width : number, height : number) {
        super(0.5 * screenWidth - 0.5 * width, 0.5 * screenHeight - 0.5 * height, width, height, "ball")

        this.screenWidth = screenWidth
        this.speedX = 6 * (Math.floor(Math.random()*2) == 1 ? 1 : -1)
        this.speedY = 6

        this.update()
    }
    
    public update() : void {
        this.xPos += this.speedX
        this.yPos += this.speedY

        if(this.xPos > this.screenWidth - this.width || this.xPos < 0){
            this.speedX = this.speedX * -1
        }
        if(this.yPos < 0){
            this.speedY = this.speedY * -1
        }

        this.object.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

    public changeDirection() {
            this.speedY = this.speedY * -1
    }
}