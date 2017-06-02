import { PainterToolService } from './painter.tool.service';
import { PainterShape } from './shapes/painter.shape';
import { PainterPosition } from './shapes/painter.position';

export class Painter {
    private shapes: PainterShape[] = [];
    private currentShape: PainterShape;

    constructor(private painterService: PainterToolService, private sheetContext: CanvasRenderingContext2D) {
        sheetContext.strokeStyle = painterService.color;
    }

    public draw(shape: PainterShape) {
        this.shapes.push(shape);
        this.currentShape = shape;
        this.currentShape.draw(this.sheetContext);
    }

    public render(position: PainterPosition) {
        this.currentShape.clear(this.sheetContext);
        this.sheetContext.beginPath();
        this.currentShape.update(position);
        this.redrawAll();
    }

    public redrawAll() {
        this.shapes.forEach(shape => {
            shape.clear(this.sheetContext);
            shape.draw(this.sheetContext);
        });
    }
}