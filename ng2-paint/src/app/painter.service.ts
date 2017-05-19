import { Injectable } from '@angular/core';
import { PainterShape } from './painter.shape';
import { PainterLine } from './painter.line';

Injectable ()
export class PainterService {
    public color: string = 'black';

    public createShape(x: number, y: number): PainterShape {
        return new PainterLine(x, y, x+10, y+10);
    }

}