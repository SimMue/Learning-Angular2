import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Painter } from './painter';
import { PainterToolService } from './painter.tool.service';
import { SliderControlService } from '../slider/slider.control.service';
import { WidthChangeable } from '../slider/width.changeable';
import { WidthInitService } from '../slider/width.init.service';
import { PainterPosition } from './shapes/painter.position';

@Component({
    selector: 'paint-sheet',
    templateUrl: './paint.sheet.component.html',
    styleUrls: ['./paint.sheet.component.css'],
})

export class PaintSheetComponent extends WidthChangeable implements AfterViewInit {
    @ViewChild('sheet') sheetReference: ElementRef;
    private sheet: HTMLCanvasElement;
    private isDrawing: boolean;
    private painter: Painter;

    constructor(sliderControlService: SliderControlService, private painterService: PainterToolService, private widthInitService: WidthInitService) {
        super(sliderControlService, widthInitService.paintSheetWidth, widthInitService.paintSheetMinWidht, widthInitService.paintSheetMaxWidht, true);
    }

    ngAfterViewInit() {
        this.sheet = <HTMLCanvasElement>this.sheetReference.nativeElement;
        let sheetContext = <CanvasRenderingContext2D>this.sheet.getContext("2d");
        this.painter = new Painter(this.painterService, sheetContext);
        this.renderHeight();
    }

    protected renderWidth(value: number, inverted: boolean) {
        super.renderWidth(value, inverted);
        this.scale(this.changingWidth, this.sheet.height);
    }

    private renderHeight() {
        // TODO: Remove magic number ---> min height = 700px (see styles.css)
        let newHeight = window.document.documentElement.clientHeight > 700 ? window.document.documentElement.clientHeight : 700;
        this.scale(this.width, newHeight);
    }

    private scale(width: number, height: number) {
        this.sheet.width = width;
        this.sheet.height = height;
        this.painter.redrawAll();
    }

    private setIsDrawing(value: boolean) {
        this.isDrawing = value;
    }

    private createNewShape(event: MouseEvent) {
        this.isDrawing = true;       
        let shape = this.painterService.createShape(this.getPosition(event));
        this.painter.draw(shape);
    }

    private renderShape(event: MouseEvent) {
        if (this.isDrawing)
        {
            this.painter.render(this.getPosition(event));
        }        
    }

    private getPosition(event: MouseEvent): PainterPosition  {
        return new PainterPosition(event.x - this.sheet.offsetLeft, event.y);
    }
}