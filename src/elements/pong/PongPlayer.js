class PongPlayer {
    x = 0;
    y = 0;
    width = 10;
    height = 100;
    color = "white";
    dy = 5;

    setLocation (x, y) {
        this.x = x;
        this.y = y;
    }
}

export default PongPlayer;