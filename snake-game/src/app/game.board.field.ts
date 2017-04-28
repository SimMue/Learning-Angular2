export abstract class BoardField {
    public Y: number;
    public X: number;

    constructor(y: number, x: number) {
        this.Y = y;
        this.X = x;
    }
}