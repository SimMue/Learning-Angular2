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
        this.sliderControlService.positionObservable.subscribe(value => this.renderChangingWidth(value, invertedWidthRender));
        this.sliderControlService.mouseDownObservable.subscribe(value => this.setWidth(value));
    }

    private setWidth(value: boolean) {
        if (value) {
            this.width = this.changingWidth;
        }
    }

    protected renderChangingWidth(value: number, inverted: boolean) {
        let widthDiff = value - this.sliderControlService.startPosition;
        let renderWidth = inverted ? this.width - widthDiff : this.width + widthDiff;

        if (renderWidth < this.minWidth) {
            this.changingWidth = this.minWidth;
        }
        else if (renderWidth > this.maxWidth)
        {
            this.changingWidth = this.maxWidth;
        }
        else
        {
            this.changingWidth = renderWidth;
        }
    }  
}