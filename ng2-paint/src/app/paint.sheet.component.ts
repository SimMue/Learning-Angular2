import { Component, ElementRef, ViewChild } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { WidthChangeable } from './width.changeable';
import { Painter } from './painter';
import { PainterService } from './painter.service';

@Component({
    selector: 'paint-sheet',
    templateUrl: './paint.sheet.component.html',
    styleUrls: ['./paint.sheet.component.css'],
})

export class PaintSheetComponent extends WidthChangeable {
    @ViewChild('sheet') sheetReference: ElementRef;
    private isDrawing: boolean;
    private painter: Painter;
    private height: number;

    constructor(sliderControlService: SliderControlService, private painterService: PainterService) {
        super(sliderControlService, 1000);
        this.height = 950;
    }

    ngAfterViewInit() {
        let canvasElement = <HTMLCanvasElement>this.sheetReference.nativeElement;
        canvasElement.height = this.height;
        canvasElement.width = this.width;  
        this.painter = new Painter(this.painterService, canvasElement);
    }

    protected renderWidth(value: number) {
        let widthDiff = value - this.sliderControlService.startPosition;
        let renderWidth = this.currentWidth - widthDiff;
        if (renderWidth < 600) {
            this.width = 600;
        }
        else if (renderWidth > 1000) {
            this.width = 1000;
        }
        else {
            this.width = renderWidth;
        }

        if (this.painter != null)
        {
            this.painter.scale(this.width);
        }
    }

    private setIsDrawing(value: boolean) {
        this.isDrawing = value;
    }

    private drawNewShape(event: MouseEvent) {
        let x = event.x - this.painter.offsetLeft;
        let y = event.y;
        let shape = this.painterService.createShape(x, y);
        this.painter.draw(shape);
    }
}