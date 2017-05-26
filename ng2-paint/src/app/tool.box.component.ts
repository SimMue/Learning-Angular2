import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { WidthChangeable } from './width.changeable';
import { WidthInitService } from './width.init.service';

@Component({
    selector: 'tool-box',
    templateUrl: './tool.box.component.html',
    styleUrls: ['./tool.box.component.css'],
})

export class ToolBoxComponent extends WidthChangeable {
    constructor(sliderControlService: SliderControlService, private widthInitService: WidthInitService) {
        super(sliderControlService, widthInitService.toolBoxWidth, widthInitService.toolBoxMinWidth, widthInitService.toolBoxMaxWidth, false);
    }
}