import { Component } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { WidthInitService } from './width.init.service';

@Component({
    selector: 'slider-control',
    templateUrl: './slider.control.component.html',
    styleUrls: ['./slider.control.component.css'],
})

export class SliderControlComponent {
    private leftPosition: number;
    private minLeftPosition: number;
    private maxLeftPosition: number;
    private offsetX: number;

    constructor(private sliderControlService: SliderControlService, private widthInitService: WidthInitService) {
        this.leftPosition = widthInitService.fileNavWidth + widthInitService.toolBoxWidth;
        this.minLeftPosition = widthInitService.fileNavWidth + widthInitService.toolBoxMinWidth;
        this.maxLeftPosition = widthInitService.fileNavWidth + widthInitService.toolBoxMaxWidth;
        this.sliderControlService.positionObservable.subscribe(value => this.setLeftPosition(value));
    }

    private setLeftPosition(value: number) {
        let newPosition = value - this.offsetX;
        if (newPosition < this.minLeftPosition) {
            this.leftPosition = this.minLeftPosition;
        }
        else if (newPosition > this.maxLeftPosition) {
            this.leftPosition = this.maxLeftPosition;
        }
        else {
            this.leftPosition = newPosition;
        }
    }

    private mouseDown(event: MouseEvent) {
        this.sliderControlService.startPosition = event.clientX;
        this.offsetX = event.offsetX;
        this.sliderControlService.setAndNotifyIsMouseDown(true);
    }
}