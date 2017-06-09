import { Component } from '@angular/core';
import { SliderControlService } from '../slider/slider.control.service';
import { WidthChangeable } from '../slider/width.changeable';
import { WidthInitService } from '../slider/width.init.service';
import { PainterToolService } from '../paint/painter.tool.service';
import { PainterTools } from '../paint/painter.tools';

@Component({
    selector: 'tool-box',
    templateUrl: './tool.box.component.html',
    styleUrls: ['./tool.box.component.css'],
})

export class ToolBoxComponent extends WidthChangeable {
    private selectedElement: HTMLElement = null;

    constructor(sliderControlService: SliderControlService, private widthInitService: WidthInitService, private painterToolService: PainterToolService) {
        super(sliderControlService, widthInitService.toolBoxWidth, widthInitService.toolBoxMinWidth, widthInitService.toolBoxMaxWidth, false);
    }

    private switchTool(event: MouseEvent) {
        let element = <HTMLElement>event.target;
        if (element.id == "line")
        {
            this.painterToolService.setTool(PainterTools.Line);
        }
        else if (element.id == "circle")
        {
            this.painterToolService.setTool(PainterTools.Circle);
        }
        else
        {
            this.painterToolService.setTool(PainterTools.Pen);            
        }
        this.setFocus(element);
    }

    private setFocus(element: HTMLElement) {
        if (this.selectedElement != null) {
            this.selectedElement.classList.remove('focused-icon');
        }
        this.selectedElement = element;
        this.selectedElement.classList.add("focused-icon");
    }
}