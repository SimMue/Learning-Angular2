import { Injectable } from '@angular/core';

@Injectable()
export class WidthInitService {
    public fileNavWidth = 50;
    public toolBoxWidth = window.innerWidth * 15 / 100;
    public toolBoxMinWidth = 100;
    public toolBoxMaxWidth = 400;
    public paintSheetWidth = window.innerWidth * 60 / 100;
    public paintSheetMinWidht = 300;
    public paintSheetMaxWidht = 900;
}