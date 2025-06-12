class FadeEffect extends HTMLElement {
    connectedCallback() {
        this.canvas = this.getOrCreateCanvas();
        this.context = this.canvas.getContext("2d");
        this.circles = [];
        this.fadeDuration = 2e3;
        this.targetElement = this.dataset.target ? this.closest(this.dataset.target) : null;
        this.colorRgb = this.dataset.colorRgb;
        this.accelerometer = null;
        this.acceleration = { x: 0, y: 0 };

        this.window_resizeHandler = () => this.updateCanvasSize();
        this.mouseMoveHandler = (e) => this.addCircle(e.clientX, e.clientY + window.scrollY);
        this.touchMoveHandler = (e) => this.addCircle(e.touches[0].clientX, e.touches[0].clientY + window.scrollY);
        this.acl_readingHandler = () => this.updateFromAccelerometer();

        if (!this.targetElement) {
            this.targetElement = this.canvas;
        }

        window.addEventListener("resize", this.window_resizeHandler);

        this.updateCanvasSize();
        
        this.animate();
        this.targetElement.addEventListener("mousemove", this.mouseMoveHandler);

        if (window.DeviceMotionEvent && !DeviceMotionEvent.requestPermission) {
            this.accelerometer = this.setupAccelerometer();
        }
        
        if (!this.accelerometer) {
            this.targetElement.addEventListener("touchmove", this.touchMoveHandler);
        }
    }

    disconnectedCallback () {
        window.removeEventListener("resize", this.window_resizeHandler);
        this.targetElement.removeEventListener("mouseover", this.mouseMoveHandler);

        if (this.accelerometer) {
            this.stopAccelerometer();
        } else {
            this.targetElement.removeEventListener("touchmove", this.touchMoveHandler);
        }
    }

    getOrCreateCanvas () {
        let canvas = this.querySelector("canvas");
        
        if (!canvas) {
            canvas = document.createElement("canvas");
            this.appendChild(canvas);
        }

        return canvas;
    }

    setupAccelerometer () {
        try {
            if (!("Accelerometer" in window)) {
                throw new Error("Accelerometer is not available");
            }

            const acl = new window.Accelerometer({
                frequency: 60
            });

            acl.addEventListener("reading", this.acl_readingHandler);                
            acl.start();

            return acl;
        } catch (error) {
            console.error("Accelerometer error:", error);
        }

        return null;
    }

    stopAccelerometer () {
        try {
            this.accelerometer.removeEventListener("reading", this.acl_readingHandler);
            this.accelerometer.stop();
        } catch (error) {
            console.error("Accelerometer error:", error);
        }
    }

    updateFromAccelerometer () {
        this.acceleration.x = -this.accelerometer.x * 100;
        this.acceleration.y = -this.accelerometer.y * 100;
        
        const centerX = this.canvas.width / 2 + this.acceleration.x;
        const centerY = this.canvas.height / 2 - this.acceleration.y - 800;

        this.addCircle(centerX, centerY);
    }

    updateCanvasSize() {
        this.canvas.width = this.clientWidth;
        this.canvas.height = this.clientHeight;
    }

    addCircle(x, y) {
        const startTime = Date.now();
        this.circles.push({ x, y, startTime });
    }

    drawCircle({ x, y, startTime }) {
        const progress = (Date.now() - startTime) / this.fadeDuration;
        const alpha = Math.max(.5 - progress, 0);
        const radius = 700 * Math.max(progress, .05);
        const gradient = this.context.createRadialGradient(x, y, 0, x, y, radius);

        gradient.addColorStop(0, `rgba(${this.colorRgb}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${this.colorRgb}, 0)`);
        
        this.context.fillStyle = gradient;

        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fill();
    }

    animate () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.circles.length - 1; i >= 0; i--) {
            const circle = this.circles[i];
            Date.now() - circle.startTime > this.fadeDuration ? this.circles.splice(i, 1) : this.drawCircle(circle);
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

export default FadeEffect;