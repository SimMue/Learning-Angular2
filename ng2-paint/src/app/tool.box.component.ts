import { Component } from '@angular/core';

@Component({
    selector: 'tool-box',
    templateUrl: './tool.box.component.html',
    styleUrls: ['./tool.box.component.css'],
})

export class ToolBoxComponent {
    private isMouseDown: boolean = false;
    private mouseDragStartX: number = 0;
    private width = '20%';
    

    private mouseDown(event: MouseEvent) {
        this.isMouseDown = true;
        this.mouseDragStartX = event.clientX;
        console.log(this.mouseDragStartX);
    }

    private mouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            this.width = event.clientX + 'px';
        }
    }

    private mouseUp(event: MouseEvent) {
        this.isMouseDown = false;
    }
}