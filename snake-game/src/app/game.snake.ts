import { DIRECTIONS } from './game.constants';
import { SnakeField } from './game.snake.field';

export class Snake {
    public Direction: number[];
    private head: SnakeField;

    constructor(yPos: number, xPos: number, direction: number[]) {
        this.Direction = direction;
        this.head = new SnakeField(yPos, xPos, null);
    }

    public getHead(): SnakeField {
        return this.head;
    }

    public move() {
        let oldHead = new SnakeField(this.head.Y, this.head.X, this.head.Next);

        this.head.Y += this.Direction[0];
        this.head.X += this.Direction[1];
        if (oldHead.Next !== null) {
            this.removeTail(oldHead);
            this.head = new SnakeField(this.head.Y, this.head.X, oldHead);
        }
    }

    public eat(boardHeight: number, boardWidth: number) {
        let preTail = this.getPreTail(this.head);
        let tail = preTail.Next;
        let yOffSet;
        let xOffSet;
        if (tail !== null) {
            yOffSet = preTail.Y - tail.Y;
            xOffSet = preTail.X - tail.X;
            if (yOffSet === 0) {
                preTail.Next.Next = this.createTail(tail.Y, tail.X - xOffSet, boardHeight - 1, boardWidth - 1);
            }
            else {
                preTail.Next.Next = this.createTail(tail.Y - yOffSet, tail.X, boardHeight - 1, boardWidth - 1);
            }
        }
        else
        {
            yOffSet = this.Direction[0];
            xOffSet = this.Direction[1];
            preTail.Next = this.createTail(preTail.Y - yOffSet, preTail.X - xOffSet, boardHeight - 1, boardWidth - 1);
        }

    }

    private removeTail(snakeField: SnakeField) {
        let preTail = this.getPreTail(snakeField);
        preTail.Next = null;
    }

    private getPreTail(snakeField: SnakeField): SnakeField {
        if (snakeField.Next != null && snakeField.Next.Next != null) {
            return this.getPreTail(snakeField.Next);
        }
        return snakeField;
    }

    private createTail(y: number, x: number, yMax: number, xMax): SnakeField {
        if (y < 0) {
            return new SnakeField(yMax, x, null);
        }
        if (y > yMax) {
            return new SnakeField(0, x, null);
        }
        if (x < 0) {
            return new SnakeField(y, xMax, null);
        }
        if (x > xMax) {
            return new SnakeField(y, 0, null);
        }
        return new SnakeField(y, x, null);
    }

    public resetHead(position: number[]) {
        this.head.Y = position[0];
        this.head.X = position[1];
    }

    public copyHead(): SnakeField {
        return this.copySnakeField(this.head);
    }

    private copySnakeField(snakeField: SnakeField): SnakeField {
        if (snakeField !== null) {
            return new SnakeField(snakeField.Y, snakeField.X, this.copySnakeField(snakeField.Next));
        }
        return null;
    }
}