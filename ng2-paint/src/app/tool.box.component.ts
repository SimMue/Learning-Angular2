import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { WidthChangeable } from './width.changeable';

@Component({
    selector: 'tool-box',
    templateUrl: './tool.box.component.html',
    styleUrls: ['./tool.box.component.css'],
})

export class ToolBoxComponent extends WidthChangeable {
    constructor(sliderControlService: SliderControlService) {
        super(sliderControlService, 100);             
    }

    protected renderWidth(value: number) {
        let widthDiff = value - this.sliderControlService.startPosition;
        let renderWidth = this.currentWidth + widthDiff;
        if (renderWidth < 100) {
            this.width = 100;
        }
        else if (renderWidth > 500)
        {
            this.width = 500;
        }
        else
        {
            this.width = renderWidth;
        }
    }    
}