import { PainterShape } from './painter.shape';
import { PainterPosition } from './painter.position';

export class PainterLine extends PainterShape {


    public draw(sheetContext: CanvasRenderingContext2D) {
        sheetContext.moveTo(this.pos.x, this.pos.y);
        sheetContext.lineTo(this.pos2.x, this.pos2.y);
        sheetContext.stroke();
    }

    public clear(sheetContext: CanvasRenderingContext2D) {
        let clearX: number = this.sortByXPos()[1];
        let clearY: number = this.sortByYPos()[1];
        let width: number = this.sortByXPos()[0] - this.sortByXPos()[1];
        let height: number = this.sortByYPos()[0] - this.sortByYPos()[1];
        sheetContext.clearRect(clearX-1, clearY-1, width+2, height+2);
    }

    public update(position: PainterPosition) {
        this.pos2 = position;
    }
}