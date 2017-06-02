import { Injectable } from '@angular/core';
import { PainterShape } from './shapes/painter.shape';
import { PainterLine } from './shapes/painter.line';
import { PainterCircle } from './shapes/painter.circle';
import { PainterScatch } from './shapes/painter.scatch';
import { PainterPosition } from './shapes/painter.position';
import { PainterTools } from './painter.tools';

Injectable ()
export class PainterToolService {
    private currentTool: PainterTools = PainterTools.Line;
    public color: string = 'black';

    public createShape(position: PainterPosition): PainterShape {
        if (this.currentTool == PainterTools.Line)
        {
            return new PainterLine(position, position);            
        }
        else if (this.currentTool == PainterTools.Circle)
        {
            return new PainterCircle(position, position);
        }
        else
        {
            return new PainterScatch(position, position);
        }
    }

    public setTool(tool: PainterTools)
    {
        this.currentTool = tool;
    }
}