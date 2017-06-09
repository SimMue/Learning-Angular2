import { PainterShape } from './painter.shape';
import { PainterPosition } from './painter.position';

export class PainterCircle extends PainterShape {
    private radius: number;

    constructor(position: PainterPosition, position2: PainterPosition) {
        super(position, position2);
        this.calculateRadius();
    }

    public draw(sheetContext: CanvasRenderingContext2D) {
        sheetContext.moveTo(this.pos.x+this.radius, this.pos.y);
        sheetContext.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*this.radius, false);
        sheetContext.stroke();
    }
    public clear(sheetContext: CanvasRenderingContext2D) {
        let clearX: number = this.pos.x - this.radius;
        let clearY: number = this.pos.y - this.radius;
        let width: number = 2 * this.radius;
        let height: number = 2 * this.radius;
        sheetContext.clearRect(clearX-1, clearY-1, width+2, height+2);
    }

    public update(position: PainterPosition) {
        this.pos2 = position;
        this.calculateRadius();
    }

    private calculateRadius() {
        let xDiff = this.sortByXPos()[0] - this.sortByXPos()[1];
        let yDiff = this.sortByYPos()[0] - this.sortByYPos()[1];
        this.radius = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }
}