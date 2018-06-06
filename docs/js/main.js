"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        this.width = 1280;
        this.height = 720;
        var container = document.createElement("container");
        container.classList.add("startbg");
        container.style.width = this.width + "px";
        container.style.height = this.height + "px";
        document.body.appendChild(container);
        var foreground = document.createElement("foreground");
        container.appendChild(foreground);
        this.currentscreen = new StartScreen(this, this.width, this.height);
        this.gameLoop();
    }
    Object.defineProperty(Game.prototype, "getWidth", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "getHeight", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.emptyScreen = function () {
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.innerHTML = "";
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(game, gamescreen) {
        var _this = this;
        this.game = game;
        this.gamescreen = gamescreen;
        var container = document.getElementsByTagName("container")[0];
        container.classList.replace("gamebg", "startbg");
        this.restartbtn = document.createElement("startbtn");
        this.restartmodal = document.createElement("startmodal");
        this.restarttext = document.createElement("starttext");
        this.highscore = document.createElement("highscore");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.restartmodal);
        this.restartmodal.appendChild(this.restartbtn);
        this.restartmodal.appendChild(this.restarttext);
        this.restartmodal.appendChild(this.highscore);
        this.restartbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    GameOver.prototype.update = function () {
        this.restarttext.innerHTML = "GAME OVER!";
        this.restarttext.style.fontSize = "80px";
        this.highscore.innerHTML = "HIGHSCORE: " + this.gamescreen.getHighscore;
        this.restartbtn.innerHTML = "TRY AGAIN";
    };
    GameOver.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game, this.game.getWidth, this.game.getHeight));
    };
    return GameOver;
}());
var GameObject = (function () {
    function GameObject(xPos, yPos, width, height, type) {
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.object = document.createElement(type);
        this.object.style.width = this.width + "px";
        this.object.style.height = this.height + "px";
        this.foreground.appendChild(this.object);
    }
    GameObject.prototype.getRectangle = function () {
        return this.object.getBoundingClientRect();
    };
    return GameObject;
}());
var Balk = (function (_super) {
    __extends(Balk, _super);
    function Balk(screenWidth, screenHeight, width, height) {
        var _this = _super.call(this, screenWidth, screenHeight, width, height, "balk") || this;
        _this.margin = [2, 2, 2, 2, 162];
        _this.class = ["purple", "red", "green", "yellow", "blue"];
        _this.randomClass = _this.class[Math.floor(Math.random() * _this.class.length)];
        _this.randomMargin = _this.margin[Math.floor(Math.random() * _this.margin.length)];
        _this.width = width;
        _this.height = height;
        _this.object.style.marginLeft = _this.randomMargin + "px";
        _this.object.classList.add(_this.randomClass);
        return _this;
    }
    Object.defineProperty(Balk.prototype, "Class", {
        get: function () {
            return this.randomClass;
        },
        enumerable: true,
        configurable: true
    });
    Balk.prototype.remove = function () {
        this.object.remove();
    };
    return Balk;
}(GameObject));
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(screenWidth, screenHeight, width, height) {
        var _this = _super.call(this, 0.5 * screenWidth - 0.5 * width, 0.5 * screenHeight - 0.5 * height, width, height, "ball") || this;
        _this.screenWidth = screenWidth;
        _this.speedX = 6 * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
        _this.speedY = 6;
        _this.update();
        return _this;
    }
    Object.defineProperty(Ball.prototype, "getY", {
        get: function () {
            return this.yPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "setY", {
        set: function (y) {
            this.yPos = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "setX", {
        set: function (x) {
            this.xPos = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "setSpeedX", {
        set: function (speed) {
            this.speedX = speed;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.update = function () {
        this.xPos += this.speedX;
        this.yPos += this.speedY;
        if (this.xPos > this.screenWidth - this.width || this.xPos < 0) {
            this.speedX = this.speedX * -1;
        }
        if (this.yPos < 0) {
            this.speedY = this.speedY * -1;
        }
        this.object.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    Ball.prototype.changeDirection = function () {
        this.speedY = this.speedY * -1;
    };
    return Ball;
}(GameObject));
var GameScreen = (function () {
    function GameScreen(g, width, height) {
        this.width = 150;
        this.height = 25;
        this.score = 0;
        this.highscore = 0;
        this.lifes = 3;
        this.game = g;
        var container = document.getElementsByTagName("container")[0];
        container.classList.replace("startbg", "gamebg");
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.textfield = document.createElement("textfield");
        this.foreground.appendChild(this.textfield);
        this.screenWidth = width;
        this.screenHeight = height;
        this.paddle = new Paddle(0.5 * this.screenWidth - 0.5 * this.width, this.screenHeight - 70, this.width, this.height);
        this.ball = new Ball(this.screenWidth, this.screenHeight, 35, 35);
        this.balks = [];
        for (var i = 0; i < 48; i++) {
            var balk = new Balk(0, 0, 156, 25);
            this.balks.push(balk);
        }
    }
    Object.defineProperty(GameScreen.prototype, "getHighscore", {
        get: function () {
            return this.highscore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScreen.prototype, "Lifes", {
        set: function (lifes) {
            this.lifes = lifes;
        },
        enumerable: true,
        configurable: true
    });
    GameScreen.prototype.update = function () {
        this.paddle.update();
        this.ball.update();
        this.textfield.innerHTML = "SCORE: " + this.score + " - LEVENS: " + this.lifes;
        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.changeDirection();
        }
        for (var _i = 0, _a = this.balks; _i < _a.length; _i++) {
            var balk = _a[_i];
            if (this.checkCollision(this.ball.getRectangle(), balk.getRectangle())) {
                balk.remove();
                this.ball.changeDirection();
                if (balk.Class == "purple") {
                    this.score = +this.score + 10;
                    this.paddle.Width = 150;
                }
                if (balk.Class == "red") {
                    this.score = +this.score + 10;
                    this.paddle.Width = 100;
                }
                if (balk.Class == "green") {
                    this.score = +this.score + 10;
                    this.paddle.Width = 50;
                }
                if (balk.Class == "yellow") {
                    this.score = +this.score + 25;
                }
                if (balk.Class == "green") {
                    this.score = +this.score + 50;
                }
            }
        }
        if (this.ball.getY > 720) {
            this.ball.setX = 0.5 * this.screenWidth;
            this.ball.setY = 0.5 * this.screenHeight;
            this.ball.setSpeedX = 6 * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
            this.lifes--;
        }
        if (this.lifes == 0) {
            if (this.score > this.highscore) {
                this.highscore == this.score;
            }
            this.game.emptyScreen();
            this.game.showScreen(new GameOver(this.game, this));
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return GameScreen;
}());
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(screenWidth, screenHeight, width, height) {
        var _this = _super.call(this, screenWidth, screenHeight, width, height, "paddle") || this;
        _this.speed = 0;
        _this.width = width;
        _this.height = height;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        _this.update();
        return _this;
    }
    Object.defineProperty(Paddle.prototype, "Width", {
        set: function (width) {
            this.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Paddle.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = -20;
                break;
            case 39:
            case 68:
                this.speed = 20;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = 0;
                break;
            case 39:
            case 68:
                this.speed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        this.xPos += this.speed;
        if (this.xPos <= 0) {
            this.xPos = 0;
        }
        if (this.xPos >= 1280 - this.width) {
            this.xPos = 1280 - this.width;
        }
        this.object.style.width = this.width + "px";
        this.object.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    return Paddle;
}(GameObject));
var Asteroid = (function () {
    function Asteroid(g) {
        this.spacegame = g;
        var foreground = document.getElementsByTagName("foreground")[0];
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);
        this.asteroidImage.src = 'images/asteroid.png';
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.y = 0 - this.asteroidSize;
        this.hitbox = document.createElement("hitbox");
        this.hitbox.style.height = this.asteroidSize + "px";
        this.hitbox.style.width = this.asteroidSize + "px";
        if (this.asteroidSize > 40) {
            this.hitbox.style.left = "-20px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 100) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 160) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
        this.asteroid = document.createElement("asteroid");
        foreground.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage);
        this.asteroid.appendChild(this.hitbox);
        console.log('Created asteroid');
    }
    Asteroid.prototype.update = function () {
        this.y += this.speed;
        this.asteroid.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.y > 720 + this.asteroidSize) {
            this.reset();
        }
    };
    Asteroid.prototype.reset = function () {
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize;
    };
    Asteroid.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    return Asteroid;
}());
var Background = (function () {
    function Background() {
        this.width = 1280;
        this.height = 720;
        this.yPos = 0;
        this.background = new Image(this.width, this.height);
        this.background.setAttribute("id", "background");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.background);
        console.log('Created background');
    }
    Background.prototype.loop = function () {
        this.yPos = this.yPos + 2;
        this.background.style.backgroundPosition = '0px ' + this.yPos + 'px';
    };
    return Background;
}());
var Laser = (function () {
    function Laser(x) {
        this.laserWidth = 15;
        this.laserHeight = 32;
        this.y = 520;
        this.x = x - 0.5 * this.laserWidth;
        this.laser = new Image(this.laserWidth, this.laserHeight);
        this.laser.setAttribute('style', 'left:' + this.x + 'px;top:0px;');
        this.laser.classList.add('laser');
        this.laser.src = 'images/laser.png';
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.laser);
        this.update();
        console.log('Created laser');
    }
    Laser.prototype.update = function () {
        this.y = this.y - 5;
        this.laser.style.transform = "translate(0px," + this.y + "px)";
        if (this.y < 0 - this.laserHeight) {
            this.laser.remove();
        }
    };
    Laser.prototype.remove = function () {
        this.laser.remove();
    };
    Laser.prototype.getRectangle = function () {
        return this.laser.getBoundingClientRect();
    };
    return Laser;
}());
var SpaceGame = (function () {
    function SpaceGame(g) {
        this.levens = 3;
        this.time = 0;
        this.afstand = 200000000;
        this.game = g;
        this.background = new Background();
        this.spaceship = new Spaceship(this);
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.textfield = document.createElement("textfield");
        this.foreground.appendChild(this.textfield);
        this.asteroids = [];
        this.lasers = [];
        for (var i = 0; i < 6; i++) {
            var asteroid = new Asteroid(this);
            this.asteroids.push(asteroid);
            asteroid.update();
        }
    }
    Object.defineProperty(SpaceGame.prototype, "Time", {
        get: function () {
            return this.time;
        },
        enumerable: true,
        configurable: true
    });
    SpaceGame.prototype.update = function () {
        this.spaceship.update();
        this.textfield.innerHTML = "LEVENS: " + this.levens + " -  AFSTAND: " + this.afstand + "km";
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;");
        for (var _i = 0, _a = this.lasers; _i < _a.length; _i++) {
            var l = _a[_i];
            l.update();
        }
        for (var _b = 0, _c = this.asteroids; _b < _c.length; _b++) {
            var asteroid = _c[_b];
            asteroid.update();
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset();
                if (this.levens > 0) {
                    this.levens--;
                }
                console.log("ship hits asteroid");
            }
            for (var _d = 0, _e = this.lasers; _d < _e.length; _d++) {
                var las = _e[_d];
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers");
                    asteroid.reset();
                    las.remove();
                }
            }
        }
        if (this.levens == 0) {
            this.game.emptyScreen();
            this.game.showScreen(new GameOver(this.game));
        }
        if (this.time == 2000) {
            this.textfield.innerHTML = "GEHAALD";
            this.textfield.setAttribute("style", "font-size:30px");
        }
        this.time++;
        this.afstand = this.afstand - 20000;
        this.background.loop();
    };
    SpaceGame.prototype.addLaser = function (l) {
        this.lasers.push(l);
    };
    SpaceGame.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return SpaceGame;
}());
var Spaceship = (function () {
    function Spaceship(g) {
        var _this = this;
        this.width = 100;
        this.height = 150;
        this.x = 0.5 * 1280 - 0.5 * this.width;
        this.y = 720 - this.height - 50;
        this.speed = 0;
        this.spacegame = g;
        this.spaceshipImage = new Image(this.width, this.height);
        this.spaceshipImage.src = 'images/ship.png';
        this.spaceshipImage.setAttribute("id", "spaceship");
        this.hitbox = document.createElement("hitbox");
        this.spaceship = document.createElement("spaceship");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.spaceship);
        this.spaceship.appendChild(this.spaceshipImage);
        this.spaceship.appendChild(this.hitbox);
        this.hitbox.style.height = '130px';
        this.hitbox.style.width = '60px';
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log('Created spaceship');
    }
    Spaceship.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = -10;
                break;
            case 39:
            case 68:
                this.speed = 10;
                break;
            case 32:
                var laserAmount = document.getElementsByClassName('laser').length;
                if (laserAmount < 4) {
                    var laser = new Laser(this.x + 0.5 * this.width);
                    this.spacegame.addLaser(laser);
                }
                break;
        }
    };
    Spaceship.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = 0;
                break;
            case 39:
            case 68:
                this.speed = 0;
                break;
            case 32:
                break;
        }
    };
    Spaceship.prototype.update = function () {
        this.x += this.speed;
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= 1280 - this.width) {
            this.x = 1280 - this.width;
        }
        this.spaceship.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Spaceship.prototype.explode = function () {
        this.spaceshipImage.src = 'images/explosion.gif';
    };
    Spaceship.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    return Spaceship;
}());
var StartScreen = (function () {
    function StartScreen(g, width, height) {
        var _this = this;
        this.game = g;
        this.width = width;
        this.height = height;
        this.startbtn = document.createElement("startbtn");
        this.startmodal = document.createElement("startmodal");
        this.starttext = document.createElement("starttext");
        this.explanation = document.createElement("explanation");
        this.balks = document.createElement("balks");
        this.points = document.createElement("points");
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.foreground.appendChild(this.startmodal);
        this.startmodal.appendChild(this.startbtn);
        this.startmodal.appendChild(this.starttext);
        this.startmodal.appendChild(this.explanation);
        this.explanation.appendChild(this.balks);
        this.explanation.appendChild(this.points);
        this.points.innerHTML = "10 Points - Large paddle <br>  &nbsp;&nbsp;10 Points - Normal paddle <br> 10 Points - Small paddle <br> 25 Points - Small paddle <br> 50 Points - Small paddle";
        this.startbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    StartScreen.prototype.update = function () {
        this.starttext.innerHTML = "BREAKOUT THE GAME!";
        this.startbtn.innerHTML = "START";
    };
    StartScreen.prototype.switchScreens = function () {
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game, this.width, this.height));
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map