import { SliderControlService } from './slider.control.service';

export abstract class WidthChangeable {
    protected currentWidth: number;
    protected width: number;

    constructor(protected sliderControlService: SliderControlService, width: number) {
        this.width = width;
        this.currentWidth = this.width;   
        this.sliderControlService.positionObservable.subscribe(value => this.renderWidth(value));
        this.sliderControlService.mouseDownObservable.subscribe(value => this.setCurrentWidth(value));
    }

    private setCurrentWidth(value: boolean) {
        if (value) {
            this.currentWidth = this.width;
        }
    }

    protected abstract renderWidth(value: number);    
}