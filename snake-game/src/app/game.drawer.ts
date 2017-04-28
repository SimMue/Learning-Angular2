import { GameBoard } from './game.board';
import { BoardField } from './game.board.field';
import { SnakeField } from './game.snake.field';
import { CherryField } from './game.cherry.field';
import { EmptyField } from './game.empty.field';
import { CollitionField } from './game.collition.field';

export class GameDrawer {
    private board: GameBoard;
    private fieldSizeCss: string;
    private fieldMarginCss: string;

    constructor(board: GameBoard) {
        this.board = board;
    }

    public getFieldCss(boardField: BoardField): string {
        if (boardField instanceof EmptyField) {
            return 'emptyField';
        }
        else if (boardField instanceof SnakeField) {
            return 'snakeField'
        }
        else if (boardField instanceof CherryField) {
            return 'cherryField'
        }
        else if (boardField instanceof CollitionField)
        {
            return 'collitionField';
        }
        return 'emptyField';
    }

    public getFieldSizeCss(): string {
        return this.fieldSizeCss;
    }

    public getFieldMarginCss(): string {
        return this.fieldMarginCss;
    }

    public initCss(factor: number) {
        this.fieldSizeCss = 75 / factor + "%";
        this.fieldMarginCss = 2 / factor + "%";

    }
    public draw(field: BoardField) {
        this.execute(field, false);
    }

    public erase(field: BoardField) {
        this.execute(field, true);
    }

    private execute(field: BoardField, erase: boolean) {
        if (field instanceof SnakeField) {
            var snakeField = <SnakeField>field;
            while (snakeField != null) {                
                this.board.setField(erase == true ? new EmptyField(snakeField.Y, snakeField.X) : snakeField);
                snakeField = snakeField.Next;
            }
        }
        else
        {
            this.board.setField(erase == true ? new EmptyField(field.Y, field.X) : field);
        }
    }
}