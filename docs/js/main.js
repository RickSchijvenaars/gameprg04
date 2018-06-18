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
        this.highscore.innerHTML = "PERSONAL HIGHSCORE: " + localStorage.getItem('highscore');
        this.restartbtn.innerHTML = "TRY AGAIN";
    };
    GameOver.prototype.switchScreens = function () {
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
    function Balk(gamescreen, xPos, yPos, width, height) {
        var _this = _super.call(this, xPos, yPos, width, height, "balk") || this;
        _this.class = ["purple", "red", "green", "yellow", "blue"];
        _this.randomClass = _this.class[Math.floor(Math.random() * _this.class.length)];
        _this.width = width;
        _this.height = height;
        _this.gamescreen = gamescreen;
        _this.object.style.marginLeft = xPos + "px";
        _this.object.style.marginTop = yPos + "px";
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
        this.removeFromArray(this);
    };
    Balk.prototype.removeFromArray = function (removeMe) {
        for (var i = 0; i < this.gamescreen.balksArray.length; i++) {
            if (this.gamescreen.balksArray[i] === removeMe) {
                this.gamescreen.balksArray.splice(i, 1);
            }
        }
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
    Ball.prototype.changeSpeed = function () {
        var posSpeeds = [6, 7, 8, 9, 10, 11];
        var negSpeeds = [-6, -7, -8, -9, -10, -11];
        if (this.speedX < 0 && this.speedY < 0) {
            this.speedX = negSpeeds[Math.floor(Math.random() * negSpeeds.length)];
            this.speedY = posSpeeds[Math.floor(Math.random() * posSpeeds.length)];
        }
        if (this.speedX > 0 && this.speedY > 0) {
            this.speedX = posSpeeds[Math.floor(Math.random() * posSpeeds.length)];
            this.speedY = negSpeeds[Math.floor(Math.random() * negSpeeds.length)];
        }
        if (this.speedX < 0 && this.speedY > 0) {
            this.speedX = negSpeeds[Math.floor(Math.random() * negSpeeds.length)];
            this.speedY = negSpeeds[Math.floor(Math.random() * negSpeeds.length)];
        }
        if (this.speedX > 0 && this.speedY < 0) {
            this.speedX = posSpeeds[Math.floor(Math.random() * posSpeeds.length)];
            this.speedY = negSpeeds[Math.floor(Math.random() * negSpeeds.length)];
        }
    };
    return Ball;
}(GameObject));
var GameScreen = (function () {
    function GameScreen(g, width, height) {
        this.score = 0;
        this.highscore = localStorage.getItem('highscore');
        this.lifes = 3;
        this.game = g;
        var container = document.getElementsByTagName("container")[0];
        container.classList.replace("startbg", "gamebg");
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.textfield = document.createElement("textfield");
        this.foreground.appendChild(this.textfield);
        this.screenWidth = width;
        this.screenHeight = height;
        this.paddle = new Paddle(0.5 * this.screenWidth - 0.5 * 150, this.screenHeight - 70, 150, 25);
        this.ball = new Ball(this.screenWidth, this.screenHeight, 35, 35);
        this.balks = [];
        this.createBalks();
    }
    Object.defineProperty(GameScreen.prototype, "Lifes", {
        set: function (lifes) {
            this.lifes = lifes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScreen.prototype, "balksArray", {
        get: function () {
            return this.balks;
        },
        enumerable: true,
        configurable: true
    });
    GameScreen.prototype.createBalks = function () {
        var positions = [160, 160, 160, 160, 320];
        var left = 2;
        var top = 2;
        for (var i = 0; i < 48; i++) {
            var xPos = positions[Math.floor(Math.random() * positions.length)];
            var balk = new Balk(this, left, top, 156, 25);
            left = left + xPos;
            if (left > 1280) {
                top = top + 29;
                left = 2;
            }
            this.balks.push(balk);
        }
    };
    GameScreen.prototype.update = function () {
        this.paddle.update();
        this.ball.update();
        this.textfield.innerHTML = "SCORE: " + this.score + " - LEVENS: " + this.lifes;
        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.changeSpeed();
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
        if (this.balks.length == 0) {
            this.ball.setX = 0.5 * this.screenWidth;
            this.ball.setY = 0.5 * this.screenHeight;
            this.ball.setSpeedX = 6 * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
            this.createBalks();
        }
        if (this.lifes == 0) {
            if (this.score > this.highscore) {
                this.newHighscore = this.score.toString();
                localStorage.setItem('highscore', this.newHighscore);
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