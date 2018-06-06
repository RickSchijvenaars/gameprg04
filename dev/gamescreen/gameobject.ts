class GameObject {
    protected object : HTMLElement
    protected xPos : number
    protected yPos : number
    protected width : number
    protected height : number
    protected foreground : Element

    constructor(xPos : number, yPos : number, width : number, height : number, type : string) {
        this.width = width
        this.height = height
        this.xPos = xPos
        this.yPos = yPos
        this.foreground = document.getElementsByTagName("foreground")[0]

        this.object = document.createElement(type)
        this.object.style.width = this.width+"px"
        this.object.style.height = this.height+"px"
        this.foreground.appendChild(this.object)
    }

    public getRectangle() {
        return this.object.getBoundingClientRect()
    }

}