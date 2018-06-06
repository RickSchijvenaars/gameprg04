/// <reference path="gameobject.ts" />

class Ball extends GameObject {
    
    private speedX : number
    private speedY : number
    private screenWidth : number
    
    constructor(screenWidth : number, screenHeight : number, width : number, height : number) {
        super(0.5 * screenWidth - 0.5 * width, 0.5 * screenHeight - 0.5 * height, width, height, "ball")

        this.screenWidth = screenWidth
        this.speedX = 8
        this.speedY = 8

        this.update()
    }
    
    public update() : void {
        this.xPos += this.speedX
        this.yPos += this.speedY

        if(this.xPos > this.screenWidth - this.width){
            this.speedX = this.speedX * -1
        }

        this.object.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

    public changeDirection() {
            this.speedY = this.speedY * -1
    }
}