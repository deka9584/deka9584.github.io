class PongBall {
    x = 0;
    y = 0;
    radius = 10;
    dx = 10;
    dy = 7;

    setLocation (x, y) {
        this.x = x;
        this.y = y;
    }

    setDY (dy) {
        this.dy = dy;
    }
}

export default PongBall;