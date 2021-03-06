# Breakout the game!

## OOP Principes:
#### Classes:
Ik gebruik verschillende gameobjecten in mijn game: een paddle, balken en een bal. Voor elk gameobject bestaat een aparte class. Dit heb ik toegepast omdat ieder object zijn eigen eigenschappen heeft. Door voor elk object een class te maken is ieder object verantwoordelijk voor zijn eigen eigenschappen. Dit maakt het erg makkelijk om bijvoorbeeld fouten op te sporen. Wanneer er bijvoorbeeld iets fout gaat met de breedte van de paddle, dan weet ik dat ik in de class naar de breedte van de paddle moet kijken, omdat de paddle verantwoordelijk is voor zijn eigen breedte.

#### Encapsulation:
In mijn code heb ik iedere variable/eigenschap van een object/class 'private' gemaakt. Dit betekent dat alleen het object zelf de waarde van de variable kan lezen of aanpassen. Het 'private-maken' van een variable zorgt voor extra veiligheid, zo is het namelijk niet mogelijk voor een buitenstaander om de waarde ervan aan te passen of te lezen. Functies daarentegen zijn 'public', zo kun je een functie aanroepen vanaf bijvoorbeeld je gamescreen. In mijn code roep ik bijvoorbeeld in de gamescreen de update-functie van ball aan, waardoor de ball over het scherm beweegt. 
Toch moet ik soms de waarde van een variable van een object aanpassen vanaf buiten het object zelf. In mijn game bijvoorbeeld de breedte van de paddle wanneer er een bepaalde kleur balk geraakt wordt. Dit heb ik gedaan door het maken van een functie die de waarde van de breedte aanpast. De functie roep ik van buitenaf aan en geef ik de nieuwe breedte als waarde mee. Het object paddle verandert zo zijn breedte.

Code-voorbeeld private variables en public function:

```
class Balk extends GameObject {

    private class: Array<string> = ["purple","red", "green", "yellow", "blue"]
    private randomClass = this.class[Math.floor(Math.random()*this.class.length)]
    private gamescreen : GameScreen

    public get Class() : string {
        return this.randomClass
    }
```

#### Composition:
Ook maak ik gebruik van composition. Zo heb ik 3 verschillende schermen waar ik gebruik van maak: een startscreen, een gamescreen en een gameoverscreen. Wanneer er op de startbutton van mijn startscreen wordt geklikt komt de gamescreen tevoorschijn. De gamescreen create de bal, paddle en balken. Wanneer de levens van de speler op zijn; create de gamescreen ook een nieuw gameoverscreen. De objecten en screens zijn dus afhankelijk van hun 'parent' of ze aangemaakt worden of niet.

In class GameScreen wordt een Paddle en Ball aangemaakt:
```
class GameScreen{

    private screenWidth: number
    private screenHeight: number
    private paddle:Paddle
```
```
 this.paddle = new Paddle(0.5 * this.screenWidth - 0.5 * 150, this.screenHeight - 70, 150, 25)
        this.ball = new Ball(this.screenWidth,this.screenHeight, 35, 35)
```

#### Inheritance:
Voor het aanmaken van objecten in mijn game (paddle, balk, ball) maak ik gebruik van een class 'GameObject'. Dit is eigenlijk de 'parent' van alle objecten. Hierin staan eigenschappen die in ieder object voorkomen, in mijn game zijn dat de positie, hoogte en breedte. Ook functies die overeenkomen bij de objecten kun je hier gebruiken. Ik gebruik de 'getRectangle' functie die om de positie en omvang van een object te bepalen (collision).
Het doel van een 'parentobject' is het vermijden van dubbele code, zo hoef je niet in ieder object aparte variables aan te maken.

Class GameObject waar waardes aan een object worden toegekend:
```
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
```

## Klassendiagram:
https://drive.google.com/open?id=1OvKRhSjeKYlCEU9GL4goOOHryJ3X4lgI

## PeerReview:
https://stud.hosted.hr.nl/0950005/2018/06/13/review-game-gijs-bijvoets/

## Extra uitdaging:
Als extra uitdaging in mijn game heb ik gekozen voor het inbrengen van een highscore. Dit doe ik door de volgende stukjes code:
```
localStorage.getItem('highscore');
```

```
if(this.score > this.highscore){
    this.newHighscore = this.score.toString()
    localStorage.setItem('highscore', this.newHighscore);
}
```
'localStorage' slaat data op in de webbrowser van de gebruiker voor onbepaalde tijd. Dit maakt het dus erg makkelijk om de highscore bij te houden van de speler. In mijn code kijk ik eerst of de behaalde score hoger is dan de huidige highscore, pas wanneer dit zo is wordt de data overschreven.

## Spel online spelen:
https://rickschijvenaars.github.io/gameprg04/
