/// <reference path="gameobject.ts" />

class Balk extends GameObject {

    private margin: Array<number> = [2, 2, 2, 2, 162]
    private class: Array<string> = ["purple","red", "green", "yellow", "blue"]
    private randomClass = this.class[Math.floor(Math.random()*this.class.length)]
    private randomMargin = this.margin[Math.floor(Math.random()*this.margin.length)]

    public get Class() : string {
        return this.randomClass
    }

    constructor(screenWidth : number, screenHeight : number, width : number, height : number) {
        super(screenWidth, screenHeight, width, height, "balk")
        this.width = width
        this.height = height
        
        this.object.style.marginLeft = this.randomMargin + "px"
        this.object.classList.add(this.randomClass)
    }

    public remove() {
        this.object.remove()
    }

}