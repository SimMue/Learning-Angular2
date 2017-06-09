import { PainterShape } from './painter.shape';
import { PainterPosition } from './painter.position';

export class PainterScatch extends PainterShape {
    private points: PainterPosition[] = [];

    public draw(sheetContext: CanvasRenderingContext2D) {
        sheetContext.beginPath();
        this.points.forEach(point => {
            sheetContext.moveTo(point.x, point.y);
            sheetContext.lineTo(point.x+1, point.y+1);  
        }); 
        sheetContext.closePath();
        sheetContext.stroke();
    }
    public clear(sheetContext: CanvasRenderingContext2D) {
       //throw new Error("Method not implemented.");
    }
    public update(position: PainterPosition) {
        this.pos.x = this.pos2.x;
        this.pos.y = this.pos2.y;   
        this.pos2 = position;
        this.points.push(position);
    }
}