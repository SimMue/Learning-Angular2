import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SliderService {
    public startPosition: number = 100;
    public isMouseDown: boolean = false;
    private offsetSubject = new BehaviorSubject<number>(0);
    public offsetObservable = this.offsetSubject.asObservable();

    public notifyNewOffset(value: number) {  
        this.offsetSubject.next(value);        
    }
}