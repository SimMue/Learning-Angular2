import { SliderControlService } from './slider.control.service';

export abstract class WidthChangeable {
    protected width: number;
    protected minWidth: number;
    protected maxWidth: number;
    protected changingWidth: number;

    constructor(protected sliderControlService: SliderControlService, width: number, minWidth: number, maxWidth: number, invertedWidthRender: boolean) {
        this.width = width;
        this.changingWidth = this.width;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.sliderControlService.positionObservable.subscribe(value => this.renderWidth(value, invertedWidthRender));
        this.sliderControlService.mouseDownObservable.subscribe(value => this.setWidth(value));
    }

    private setWidth(value: boolean) {
        if (value) {
            this.width = this.changingWidth;
        }
    }

    protected renderWidth(value: number, inverted: boolean) {
        let widthDiff = value - this.sliderControlService.startPosition;
        let renderWidth = inverted ? this.width - widthDiff : this.width + widthDiff;
        this.changingWidth = this.getWidth(renderWidth);
    }

    private getWidth(value: number): number {
        if (value < this.minWidth) {
            return this.minWidth;
        }
        else if (value > this.maxWidth)
        {
            return this.maxWidth;
        }
        
        return value;        
    }
}