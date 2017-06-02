import { PainterPosition } from './painter.position';

export abstract class PainterShape {
    protected pos: PainterPosition;
    protected pos2: PainterPosition;

    constructor(position: PainterPosition, position2: PainterPosition) {
        this.pos = position;
        this.pos2 = position2;
    }

    public abstract draw(sheetContext: CanvasRenderingContext2D);
    public abstract clear(sheetContext: CanvasRenderingContext2D);
    public abstract update(position: PainterPosition);
    protected sortByXPos(): [number, number] {
        return this.pos.x > this.pos2.x ? [this.pos.x, this.pos2.x] : [this.pos2.x, this.pos.x];
    }   
    protected sortByYPos(): [number, number] {
        return this.pos.y > this.pos2.y ? [this.pos.y, this.pos2.y] : [this.pos2.y, this.pos.y];
    }
    
}