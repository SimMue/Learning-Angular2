import { Injectable } from '@angular/core';

@Injectable()
export class WidthInitService {
    public fileNavWidth = 50;
    public toolBoxWidth;
    public toolBoxMinWidth = 100;
    public toolBoxMaxWidth = 400;
    public paintSheetWidth;
    public paintSheetMinWidht = 600;
    public paintSheetMaxWidht = 900;

    constructor() {
        this.toolBoxWidth =  this.getWidth(window.innerWidth * 5 / 100, this.toolBoxMinWidth, this.toolBoxMaxWidth);
        this.paintSheetWidth = this.getWidth(window.innerWidth * 60 / 100, this.paintSheetMinWidht, this.paintSheetMaxWidht);
    }

    private getWidth(value: number, minWidth: number, maxWidth: number): number {
        if (value < minWidth) {
            return minWidth;
        }
        else if (value > maxWidth)
        {
            return maxWidth;
        }
        
        return value;        
    }
}