import { Component } from '@angular/core';
import { SliderControlService } from './slider.control.service';

@Component({
    selector: 'slider-control',
    templateUrl: './slider.control.component.html',
    styleUrls: ['./slider.control.component.css'],
})

export class SliderControlComponent {
    private leftPosition: number;
    private offsetX: number;

    constructor(private sliderControlService: SliderControlService) {
        this.sliderControlService.positionObservable.subscribe(value => this.setLeftPosition(value));
    }

    private setLeftPosition(value: number) {
        if (value < 150) {
            this.leftPosition = 150 - this.offsetX;
        }
        else if (value > 550) {
            this.leftPosition = 550 - this.offsetX;
        }
        else {
            this.leftPosition = value - this.offsetX;
        }
    }

    private mouseDown(event: MouseEvent) {
        this.sliderControlService.startPosition = event.clientX;
        this.offsetX = event.offsetX;
        this.sliderControlService.setAndNotifyIsMouseDown(true);
    }
}