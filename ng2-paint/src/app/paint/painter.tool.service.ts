import { Injectable } from '@angular/core';
import { PainterShape } from './painter.shape';
import { PainterLine } from './painter.line';
import { PainterPosition } from './painter.position';

Injectable ()
export class PainterToolService {
    public color: string = 'black';

    public createShape(position: PainterPosition): PainterShape {
        return new PainterLine(position, position);
    }

}