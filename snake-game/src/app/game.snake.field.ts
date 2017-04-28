import { BoardField } from './game.board.field';

export class SnakeField extends BoardField {    
    public Next: SnakeField;

    constructor(y: number, x: number, next: SnakeField)
    {
        super(y, x);        
        this.Next = next;
    }
}