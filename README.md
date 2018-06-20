# Breakout the game!

## OOP Principes:
#### Classes:
Ik gebruik verschillende gameobjecten in mijn game: een paddle, balken en een bal. Voor elk gameobject bestaat een aparte class. Dit heb ik toegepast omdat ieder object zijn eigen eigenschappen heeft. Door voor elk object een class te maken is ieder object verantwoordelijk voor zijn eigen eigenschappen. Dit maakt het erg makkelijk om bijvoorbeeld fouten op te sporen. Wanneer er bijvoorbeeld iets fout gaat met de breedte van de paddle, dan weet ik dat ik in de class naar de breedte van de paddle moet kijken, omdat de paddle verantwoordelijk is voor zijn eigen breedte.

#### Encapsulation:
In mijn code heb ik iedere variable/eigenschap van een object/class 'private' gemaakt. Dit betekent dat alleen het object zelf de waarde van de variable kan lezen of aanpassen. Het 'private-maken' van een variable zorgt voor extra veiligheid, zo is het namelijk niet mogelijk voor een buitenstaander om de waarde ervan aan te passen of te lezen. Functies daarentegen zijn 'public', zo kun je een functie aanroepen vanaf bijvoorbeeld je gamescreen. In mijn code roep ik bijvoorbeeld in de gamescreen de update-functie van ball aan, waardoor de ball over het scherm beweegt. 
Toch moet ik soms de waarde van een variable van een object aanpassen vanaf buiten het object zelf. In mijn game bijvoorbeeld de breedte van de paddle wanneer er een bepaalde kleur balk geraakt wordt. Dit heb ik gedaan door het maken van een functie die de waarde van de breedte aanpast. De functie roep ik van buitenaf aan en geef ik de nieuwe breedte als waarde mee. Het object paddle verandert zo zijn breedte.

#### Composition:
Ook maak ik gebruik van composition. Zo heb ik 3 verschillende schermen waar ik gebruik van maak: een startscreen, een gamescreen en een gameoverscreen. Wanneer er op de startbutton van mijn startscreen wordt geklikt komt de gamescreen tevoorschijn. De gamescreen create de bal, paddle en balken. Wanneer de levens van de speler op zijn; create de gamescreen ook een nieuw gameoverscreen. De objecten en screens zijn dus afhankelijk van hun 'parent' of ze aangemaakt worden of niet.

#### Inheritance:
Voor het aanmaken van objecten in mijn game (paddle, balk, ball) maak ik gebruik van een class 'GameObject'. Dit is eigenlijk de 'parent' van alle objecten. Hierin staan eigenschappen die in ieder object voorkomen, in mijn game zijn dat de positie, hoogte en breedte. Ook functies die overeenkomen bij de objecten kun je hier gebruiken. Ik gebruik de 'getRectangle' functie die om de positie en omvang van een object te bepalen (collision).
Het doel van een 'parentobject' is het vermijden van dubbele code, zo hoef je niet in ieder object aparte variables aan te maken.

## Klassendiagram:
https://drive.google.com/open?id=1OvKRhSjeKYlCEU9GL4goOOHryJ3X4lgI

## PeerReview:
https://stud.hosted.hr.nl/0950005/2018/06/13/review-game-gijs-bijvoets/
