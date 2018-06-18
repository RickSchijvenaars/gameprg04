/// <reference path="gameobject.ts" />

class Balk extends GameObject {

    private class: Array<string> = ["purple","red", "green", "yellow", "blue"]
    private randomClass = this.class[Math.floor(Math.random()*this.class.length)]
    private gamescreen : GameScreen

    public get Class() : string {
        return this.randomClass
    }

    constructor(gamescreen : GameScreen, xPos : number, yPos : number, width : number, height : number) {
        super(xPos, yPos, width, height, "balk")
        this.width = width
        this.height = height
        this.gamescreen = gamescreen
        
        this.object.style.marginLeft = xPos + "px"
        this.object.style.marginTop = yPos + "px"
        this.object.classList.add(this.randomClass)
    }

    public remove() {
        this.object.remove()
        this.removeFromArray(this)
    }

    public removeFromArray(removeMe: Balk) {
        for (let i = 0;i< this.gamescreen.balksArray.length ;i++) {
            if (this.gamescreen.balksArray[i] === removeMe) {
                this.gamescreen.balksArray.splice(i, 1);
            }
        }
    }

}