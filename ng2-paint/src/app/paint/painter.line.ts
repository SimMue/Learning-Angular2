import { PainterShape } from './painter.shape';
import { PainterPosition } from './painter.position';

export class PainterLine extends PainterShape {    
    private x2: number;
    private y2: number;

    constructor(position: PainterPosition, position2: PainterPosition) {
        super(position.x, position.y);
        this.x2 = position2.x;
        this.y2 = position2.y;
    }

    public draw(sheetContext: CanvasRenderingContext2D) {
        sheetContext.moveTo(this.x, this.y);
        sheetContext.lineTo(this.x2, this.y2);
        sheetContext.stroke();
    }

    public clear(sheetContext: CanvasRenderingContext2D) {
        let clearX: number = this.x > this.x2 ? this.x2 : this.x;
        let clearY: number = this.y > this.y2 ? this.y2 : this.y;
        let width: number = this.x > this.x2 ? this.x - this.x2 : this.x2 - this.x;
        let height: number = this.y > this.y2 ? this.y - this.y2 : this.y2 - this.y;
        sheetContext.clearRect(clearX-1, clearY-1, width+2, height+2);
    }

    public update(position: PainterPosition) {
        this.x2 = position.x;
        this.y2 = position.y;
    }
}