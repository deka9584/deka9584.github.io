import PongBall from "./pong/PongBall";
import PongPlayer from "./pong/PongPlayer";

class PongGame extends HTMLElement {
    static observedAttributes = ["difficulty", "mouse-enabled"];

    connectedCallback () {
        this.bgColor = this.dataset.bgColor;
        this.drawBackground = this.bgColor !== "none";
        this.isGameOver = false;
        this.isRunning = false;
        this.mouseDisabled = false;
        this.keyState = new Set();

        this.points = {
            player: 0,
            bot: 0
        }

        this.player = new PongPlayer();
        this.bot = new PongPlayer();
        this.ball = new PongBall();

        this.canvas = this.querySelector("canvas");
        this.context = this.canvas?.getContext("2d");
        this.optionsForm = this.querySelector("form");
        this.counterDisplay = this.querySelector("[data-points]");

        if (this.canvas) {
            this.player.setLocation(0, this.canvas.height / 2 - 50);
            this.bot.setLocation(this.canvas.width - 10, this.canvas.height / 2 - 50);
            this.ball.setLocation(this.canvas.width / 2, this.canvas.height / 2);

            if (this.optionsForm) {
                this.optionsForm.addEventListener("change", this.readOptionsForm.bind(this));
                this.readOptionsForm();
            }

            this.setupMouseListeners();
            this.setupKeyListeners();
            this.startGame();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case "difficulty":
                this.setDifficulty(newValue);
                break;

            case "mouse-enabled":
                this.mouseDisabled = newValue !== "true";
                break;

            default:
                break;
        }
    }

    checkPadCollision () {
        return (
            this.ball.x - this.ball.radius < this.player.x + this.player.width &&
            this.ball.y + this.ball.radius > this.player.y &&
            this.ball.y - this.ball.radius < this.player.y + this.player.height
        ) || (
            this.ball.x + this.ball.radius > this.bot.x &&
            this.ball.y + this.ball.radius > this.bot.y &&
            this.ball.y - this.ball.radius < this.bot.y + this.bot.height
        );
    }

    displayPoints () {
        if (this.counterDisplay) {
            this.counterDisplay.setAttribute("data-points", this.points.player);
            this.counterDisplay.setAttribute("data-enemy-points", this.points.bot);
            this.counterDisplay.innerHTML = `${this.points.player}/${this.points.bot}`;
        }
    }

    drawRect (x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawCircle (x, y, radius, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fill();
    }
    
    drawNet () {
        for (let i = 0; i <= this.canvas.height; i += 15) {
            this.drawRect(this.canvas.width / 2 - 1, i, 2, 10, "white");
        }
    }

    getBotDirection () {
        const offset = this.bot.y + this.bot.height / 2;

        if (offset < this.ball.y) {
            return this.bot.dy;
        }

        if (offset > this.ball.y) {
            return -this.bot.dy;
        }

        return 0;
    }

    getPlayerDirection () {
        if (this.keyState.has("ArrowUp") && this.player.y > 0) {
            return -this.player.dy;
        }

        if (this.keyState.has("ArrowDown") && this.player.y + this.player.height < this.canvas.height) {
            return this.player.dy;
        }

        return 0;
    }

    overridePlayerY (clientY = 0) {
        const relativeY = clientY - this.canvas.height / 2;

        if (relativeY <= 0) {
            this.player.y = 0;
            return;
        }

        if (relativeY + this.player.height > this.canvas.height) {
            this.player.y = this.canvas.height - this.player.height;
            return;
        }

        this.player.y = relativeY;
    }

    readOptionsForm () {
        const formData = new FormData(this.optionsForm);
        const fields = Object.fromEntries(formData.entries());

        if (fields.difficulty) {
            this.setDifficulty(fields.difficulty);
        }

        this.mouseDisabled = !fields.mouseToggle;
    }

    resetBoard () {
        this.isGameOver = true;

        this.player.y = this.canvas.height / 2 - this.player.height / 2;
        this.bot.y = this.canvas.height / 2 - this.bot.height / 2;

        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.dx *= -1;

        setTimeout(() => {
            this.isGameOver = false;
        }, 1000);

        this.displayPoints();
    }

    run () {
        if (this.isRunning) {
            this.update();
            window.requestAnimationFrame(this.run.bind(this));
        }
    }

    setDifficulty (diff) {
        this.points.bot = 0;
        this.points.player = 0;
        this.resetBoard();

        switch (diff) {
            case "easy":
                this.ball.setDY(7);
                break;
            case "normal":
                this.ball.setDY(8);
                break;
            case "hard":
                this.ball.setDY(9);
                break;
            default:
                console.warn("Unknown difficulty:", diff);
                break;
        }
    }

    setupKeyListeners () {
        window.addEventListener("keydown", (event) => {
            if (event.key.includes("Arrow")) {
                event.preventDefault();
                this.keyState.add(event.key);
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.key.includes("Arrow")) {
                event.preventDefault();
                this.keyState.delete(event.key);
            }
        });
    }

    setupMouseListeners () {
        this.canvas.addEventListener("touchmove", (event) => {
            const touch = event.touches[0];
            event.preventDefault();
            this.overridePlayerY(touch.clientY);
        });

        window.addEventListener("mousemove", (event) => {
            if (!this.mouseDisabled) {
                this.overridePlayerY(event.clientY);
            }
        });
    }

    startGame () {
        if (this.context) {
            this.isRunning = true;
            this.run();
            this.displayPoints();
        }
    }

    update () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.drawBackground) {
            this.drawRect(0, 0, this.canvas.width, this.canvas.height, this.bgColor);
        }

        this.drawNet();
        this.drawRect(this.player.x, this.player.y, this.player.width, this.player.height, this.player.color);
        this.drawRect(this.bot.x, this.bot.y, this.bot.width, this.bot.height, this.bot.color);
        this.drawCircle(this.ball.x, this.ball.y, this.ball.radius);

        if (!this.isGameOver) {
            this.player.y += this.getPlayerDirection();
            this.bot.y += this.getBotDirection();

            this.ball.x += this.ball.dx;
            this.ball.y += this.ball.dy;

            if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
                this.ball.dy *= -1;
            }

            if (this.checkPadCollision()) {
                this.ball.dx *= -1;
            }

            if (this.ball.x + this.ball.radius > this.canvas.width) {
                this.points.player++;
                this.resetBoard();
            }

            if (this.ball.x - this.ball.radius < 0) {
                this.points.bot++;
                this.resetBoard();
            }
        }
    }
}

export default PongGame;