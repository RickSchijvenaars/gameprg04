class StartScreen {

    // private textfield: HTMLElement
    private game : Game
    private startbtn : HTMLElement
    private startmodal : HTMLElement
    private starttext : HTMLElement
    private foreground : Element
    private width: number
    private height: number

    constructor(g:Game, width:number, height:number) {
        this.game = g
        this.width = width
        this.height = height
        
        this.startbtn = document.createElement("startbtn")
        this.startmodal = document.createElement("startmodal")
        this.starttext = document.createElement("starttext")

        // append modal to foreground
        this.foreground = document.getElementsByTagName("foreground")[0]
        this.foreground.appendChild(this.startmodal)
        this.startmodal.appendChild(this.startbtn)
        this.startmodal.appendChild(this.starttext)

        this.startbtn.addEventListener("click", ()=> this.switchScreens())
    }

    public update() {
        this.starttext.innerHTML = "BREAKOUT THE GAME!"
        this.startbtn.innerHTML = "START"
    }

    private switchScreens(){
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game, this.width, this.height))
    }
}