import { Component } from '@angular/core';
import { SliderService } from './slider.service';

@Component ({
    selector: 'slider-component',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css'],
})

export class SliderComponent {
    private leftPosition: number;

    constructor(private sliderService: SliderService) {
        this.sliderService.offsetObservable.subscribe(value => value > 100 ? this.leftPosition = value : this.leftPosition = 100);
    }

    private mouseDown(event: MouseEvent) {
        this.sliderService.startPosition = event.clientX;
        this.sliderService.isMouseDown = true;
    }
}