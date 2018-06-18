/// <reference path="gameobject.ts" />

class Paddle extends GameObject {
        
    private speed : number = 0;
   
    public set Width(width : number){
        this.width = width
    }
    

    constructor(screenWidth : number, screenHeight : number, width : number, height : number) {
        super(screenWidth, screenHeight, width, height, "paddle")

        this.width = width
        this.height = height
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        this.update()
    }

    public onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37: // LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speed = -20
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speed = 20
            break
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:// LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speed = 0
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speed = 0
            break
        }
    }

    public update() {
        this.xPos += this.speed 
        if(this.xPos <= 0){
            this.xPos = 0
        }
        if(this.xPos >= 1280 - this.width) {
            this.xPos = 1280 - this.width
        }    

        this.object.style.width = this.width + "px"
        this.object.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

}