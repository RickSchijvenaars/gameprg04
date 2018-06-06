class StartScreen {

    // private textfield: HTMLElement
    private game : Game
    private startbtn : HTMLElement
    private startmodal : HTMLElement
    private starttext : HTMLElement
    private explanation : HTMLElement
    private balks : HTMLElement
    private points : HTMLElement
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
        this.explanation = document.createElement("explanation")
        this.balks = document.createElement("balks")
        this.points = document.createElement("points")

        // append modal to foreground
        this.foreground = document.getElementsByTagName("foreground")[0]
        this.foreground.appendChild(this.startmodal)
        this.startmodal.appendChild(this.startbtn)
        this.startmodal.appendChild(this.starttext)
        this.startmodal.appendChild(this.explanation)
        this.explanation.appendChild(this.balks)
        this.explanation.appendChild(this.points)

        this.points.innerHTML = "10 Points - Large paddle <br>  &nbsp;&nbsp;10 Points - Normal paddle <br> 10 Points - Small paddle <br> 25 Points - Small paddle <br> 50 Points - Small paddle"

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