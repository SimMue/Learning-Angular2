import { BoardField } from './game.board.field';
import { SnakeField } from './game.snake.field';
import { CherryField } from './game.cherry.field';
import { EmptyField } from './game.empty.field';


export class GameBoard {
    public Height: number;
    public Width: number;
    private board: BoardField[][];

    public initialize(height: number, width: number) {
        this.Height = height;
        this.Width = width;
        this.board = [];
        for (let y = 0; y < height; y++) {
            let column: BoardField[] = [];

            for (let x = 0; x < width; x++) {
                column.push(new EmptyField(y, x));
            }

            this.board.push(column);
        }
    }

    public isSnakeField(y: number, x: number) : boolean {
        return this.board[y][x] instanceof SnakeField;
    }

    public isCherryField(y: number, x: number) : boolean {
        return this.board[y][x] instanceof CherryField;
    }

    public setField(field: BoardField) {
        this.board[field.Y][field.X] = field;
    }

    public getBoard(): BoardField[][] {
        return this.board;
    }
}