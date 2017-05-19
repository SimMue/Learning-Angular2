import { PainterService } from './painter.service';
import { PainterShape } from './painter.shape';

export class Painter {
    private sheetContext: CanvasRenderingContext2D;
    public offsetLeft: number;
    public offsetTop: number;
    private shapes: PainterShape[] = [];

    constructor(private painterService: PainterService, private sheetElement: HTMLCanvasElement) {
        this.sheetContext = <CanvasRenderingContext2D>sheetElement.getContext("2d");
        this.sheetContext.strokeStyle = painterService.color;
        this.offsetLeft = sheetElement.offsetLeft;
        this.offsetTop = sheetElement.offsetTop;
    }

    public draw(shape: PainterShape) {
        this.shapes.push(shape);
        shape.draw(this.sheetContext);
    }

    public scale(x: number)
    {
        this.sheetElement.width = x;
        this.redrawAll();       
    }

    public redrawAll() {
        this.shapes.forEach(shape => {
            shape.clear(this.sheetContext);
            shape.draw(this.sheetContext);
        });
    }
}