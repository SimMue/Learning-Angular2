import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { SliderService } from './slider.service';

@Component({
    selector: 'tool-box',
    templateUrl: './tool.box.component.html',
    styleUrls: ['./tool.box.component.css'],
})

export class ToolBoxComponent {
    private width: number;  

    constructor(private sliderService: SliderService) {
        this.width = 100;
        this.sliderService.offsetObservable.subscribe(value => value > 100 ? this.setWidth(value) : this.setWidth(100));
    }

    private setWidth(value: number) {
        this.width = this.width + value - this.sliderService.startPosition;
    }
}