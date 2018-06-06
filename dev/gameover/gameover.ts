class GameOver {
    private game : Game
    private gamescreen : GameScreen
    private restartbtn : HTMLElement
    private restartmodal : HTMLElement
    private restarttext : HTMLElement
    private highscore : HTMLElement

    constructor(game:Game, gamescreen : GameScreen) {
        this.game = game
        this.gamescreen = gamescreen

        let container = document.getElementsByTagName("container")[0]
        container.classList.replace("gamebg", "startbg")
        
        this.restartbtn = document.createElement("startbtn")
        this.restartmodal = document.createElement("startmodal")
        this.restarttext = document.createElement("starttext")
        this.highscore = document.createElement("highscore")


        // get container
        let foreground = document.getElementsByTagName("foreground")[0]

        // append modal to container
        foreground.appendChild(this.restartmodal)
        this.restartmodal.appendChild(this.restartbtn)
        this.restartmodal.appendChild(this.restarttext)
        this.restartmodal.appendChild(this.highscore)

        this.restartbtn.addEventListener("click", ()=> this.switchScreens())

    }
    public update() {    
        this.restarttext.innerHTML = "GAME OVER!"
        this.restarttext.style.fontSize = "80px"

        this.highscore.innerHTML = "HIGHSCORE: " + this.gamescreen.getHighscore

        this.restartbtn.innerHTML = "TRY AGAIN"
    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game, this.game.getWidth, this.game.getHeight))
    }
}