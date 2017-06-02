import { PainterPosition } from './painter.position';

export abstract class PainterShape {
    protected x: number;
    protected y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public abstract draw(sheetContext: CanvasRenderingContext2D);
    public abstract clear(sheetContext: CanvasRenderingContext2D);
    public abstract update(position: PainterPosition);
}