import { PainterShape } from './painter.shape';

export class PainterLine extends PainterShape {    
    private x2: number;
    private y2: number;

    constructor(x: number, y: number, x2: number, y2: number) {
        super(x, y);
        this.x2 = x2;
        this.y2 = y2;
    }

    public draw(sheetContext: CanvasRenderingContext2D) {
        sheetContext.moveTo(this.x, this.y);
        sheetContext.lineTo(this.x2, this.y2);
        sheetContext.stroke();
    }

    public clear(sheetContext: CanvasRenderingContext2D) {
        let width: number = this.x > this.x2 ? this.x - this.x2 : this.x2 - this.x;
        let height: number = this.y > this.y2 ? this.y - this.y2 : this.y2 - this.y;
        sheetContext.clearRect(this.x, this.y, width, height);
    }

    public update(x: number, y: number) {
        this.x2 = x;
        this.y2 = y;
    }
}