class Game {

    private currentscreen : StartScreen | GameScreen | GameOver
    private width: number = 1280
    private height: number = 720

    public get getWidth() : number {
        return this.width
    }

    public get getHeight() : number {
        return this.height
    }

    constructor() {
        // append container to body
        let container = document.createElement("container")
        container.classList.add("startbg")
        container.style.width = this.width+"px"
        container.style.height = this.height+"px"
        document.body.appendChild(container)
        
        // append foreground to container
        let foreground = document.createElement("foreground")
        container.appendChild(foreground)

        this.currentscreen = new StartScreen(this, this.width, this.height)
        
        this.gameLoop()
    }

    private gameLoop():void{
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public emptyScreen() {
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.innerHTML = ""
    }

    public showScreen(screen : StartScreen | GameScreen | GameOver ) {
        this.currentscreen = screen
    }
} 

window.addEventListener("load", () => new Game())