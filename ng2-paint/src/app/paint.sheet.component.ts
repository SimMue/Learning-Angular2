import { Component, ElementRef, ViewChild } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { WidthChangeable } from './width.changeable';
import { Painter } from './painter';
import { PainterService } from './painter.service';
import { WidthInitService } from './width.init.service';

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

    constructor(sliderControlService: SliderControlService, private painterService: PainterService, private widthInitService: WidthInitService) {
        super(sliderControlService, widthInitService.paintSheetWidth, widthInitService.paintSheetMinWidht, widthInitService.paintSheetMaxWidht, true);
    }

    ngAfterViewInit() {
        let sheetElement = <HTMLCanvasElement>this.sheetReference.nativeElement;
        sheetElement.width = this.changingWidth;
        this.painter = new Painter(this.painterService, sheetElement);
        console.log(this.changingWidth);
        console.log(this.height);
    }

    protected renderChangingWidth(value: number, inverted: boolean) {
        super.renderChangingWidth(value, inverted);

        if (this.painter != null)
        {
            this.painter.scale(this.changingWidth);
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