import fadeEffectConfig from "../resources/fadeEffectConfig.json";

class FadeEffect extends HTMLElement {
    connectedCallback() {
        this.canvas = this.getOrCreateCanvas();
        this.context = this.canvas.getContext("2d");
        this.circles = [];
        this.fadeDuration = this.dataset.fadeDuration || fadeEffectConfig.fadeDuration;
        this.target = this.dataset.target ? this.closest(this.dataset.target) : this.canvas;
        this.colorRgb = this.dataset.colorRgb || fadeEffectConfig.defaultPrimaryColor;
        this.colorRgbClick = this.dataset.colorRgbClick || fadeEffectConfig.defaultSecondaryColor;
        this.clickChangeColor = this.dataset.clickChangeColor === "true";
        this.accelerometer = null;
        this.listeningDeviceMotion = false;
        this.isMouseDown = false;

        this.window_resizeHandler = () => this.updateCanvasSize();
        this.mouseMoveHandler = (e) => this.addCircle(e.clientX, e.clientY + window.scrollY);
        this.touchMoveHandler = (e) => this.onTouchMove(e.touches);
        this.acl_readingHandler = () => this.updateFromAccelerometer();
        this.deviceMotion_handler = (e) => this.updateFromDeviceMotion(e.accelerationIncludingGravity);
        this.mouseDownHandler = () => this.isMouseDown = true;
        this.mouseLeaveOrUpHandler = () => this.isMouseDown = false;
        
        this.updateCanvasSize();
        this.animate();

        window.addEventListener("resize", this.window_resizeHandler);
        this.target.addEventListener("mousemove", this.mouseMoveHandler);
        this.target.addEventListener("mousedown", this.mouseDownHandler);
        this.target.addEventListener("mouseleave", this.mouseLeaveOrUpHandler);
        this.target.addEventListener("mouseup", this.mouseLeaveOrUpHandler);

        if (window.DeviceMotionEvent && !DeviceMotionEvent.requestPermission) {
            this.accelerometer = this.setupAccelerometer();
        }
        
        this.target.addEventListener("touchmove", this.touchMoveHandler);
    }

    disconnectedCallback () {
        window.removeEventListener("resize", this.window_resizeHandler);

        this.target.removeEventListener("mousedown", this.mouseDownHandler);
        this.target.removeEventListener("mouseleave", this.mouseLeaveOrUpHandler);
        this.target.removeEventListener("mouseup", this.mouseLeaveOrUpHandler);
        this.target.removeEventListener("mouseover", this.mouseMoveHandler);

        if (this.accelerometer) {
            this.stopAccelerometer();
        }

        this.target.removeEventListener("touchmove", this.touchMoveHandler);

        if (this.listeningDeviceMotion) {
            this.stopDeviceMotionListener();
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

    onTouchMove (touches) {
        if (this.accelerometer || this.listeningDeviceMotion) return;

        for (const touch of touches) {
            this.addCircle(touch.clientX, touch.clientY + window.scrollY);
        }
    }

    toggleDeviceMotion () {
        if (this.accelerometer) {
            this.stopAccelerometer();
            this.accelerometer = null;
            return;
        }

        if (this.listeningDeviceMotion) {
            this.stopDeviceMotionListener();
            return;
        }

        if (window.DeviceMotionEvent) {
            if (!DeviceMotionEvent.requestPermission) {
                this.accelerometer = this.setupAccelerometer();
                return;
            }

            DeviceMotionEvent.requestPermission()
                .then(result => {
                    if (result === "granted") {
                        this.setupDeviceMotionListener();
                    }
                })
                .catch(err => console.error(err));
        }
    }

    setupAccelerometer () {
        if (!window.Accelerometer) {
            console.error("Accelerometer is not available");
            return null;
        }

        try {
            const acl = new window.Accelerometer({ frequency: 60 });

            acl.addEventListener("reading", this.acl_readingHandler);                
            acl.start();

            return acl;
        } catch (error) {
            console.error("Accelerometer error:", error);
        }

        return null;
    }

    setupDeviceMotionListener () {
        window.addEventListener("devicemotion", this.deviceMotion_handler);
        this.listeningDeviceMotion = true;
    }

    stopAccelerometer () {
        try {
            this.accelerometer.removeEventListener("reading", this.acl_readingHandler);
            this.accelerometer.stop();
        } catch (error) {
            console.error("Accelerometer error:", error);
        }
    }

    stopDeviceMotionListener () {
        window.removeEventListener("devicemotion", this.deviceMotion_handler);
        this.listeningDeviceMotion = false;
    }

    updateFromAccelerometer () {
        const aclX = -this.accelerometer.x * 100;
        const aclY = -this.accelerometer.y * 100;
        
        const centerX = this.canvas.width / 2 + aclX;
        const centerY = this.canvas.height / 2 - aclY - 800;

        this.addCircle(centerX, centerY);
    }

    updateFromDeviceMotion (acceleration) {
        // TO-DO
        console.log("TO-DO: updateFromDeviceMotion", acceleration);
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
        let color = this.colorRgb;

        if (this.clickChangeColor && this.isMouseDown && this.colorRgbClick) {
            color = this.colorRgbClick;
        }

        gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        this.context.fillStyle = gradient;

        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fill();
    }

    animate () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.circles.length - 1; i >= 0; i--) {
            const circle = this.circles[i];
            const isFadeEnded = Date.now() - circle.startTime > this.fadeDuration;
            isFadeEnded ? this.circles.splice(i, 1) : this.drawCircle(circle);
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

export default FadeEffect;