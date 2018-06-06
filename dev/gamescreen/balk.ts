/// <reference path="gameobject.ts" />

class Balk extends GameObject {

    constructor(screenWidth : number, screenHeight : number, width : number, height : number) {
        super(screenWidth, screenHeight, width, height, "balk")
        this.width = width
        this.height = height

        let type: Array<string> = ["purple","red", "green", "yellow", "blue", "none"]
        let random = type[Math.floor(Math.random()*type.length)]
        this.object.classList.add(random)

    }
}