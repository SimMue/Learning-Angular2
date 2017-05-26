import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WidthInitService } from './width.init.service';

@Injectable()
export class SliderControlService {
    public startPosition: number;
    private isMouseDown: boolean = false;
    private positionSubject = new BehaviorSubject<number>(0);
    public positionObservable = this.positionSubject.asObservable();
    private mouseDownSubject = new BehaviorSubject<boolean>(false);
    public mouseDownObservable = this.mouseDownSubject.asObservable();

    constructor(widthInitService: WidthInitService)
    {
        this.startPosition = widthInitService.fileNavWidth + widthInitService.toolBoxWidth;
    }

    public notifyNewPosition(value: number) {  
        this.positionSubject.next(value);        
    }

    public setAndNotifyIsMouseDown(value: boolean) {
        this.isMouseDown = value;
        this.mouseDownSubject.next(value);
    }

    public getIsMouseDown(): boolean {
        return this.isMouseDown;
    }
}