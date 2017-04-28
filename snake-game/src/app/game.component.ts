import { Component, DoCheck } from '@angular/core';
import { Snake } from './game.snake';
import { SnakeField } from './game.snake.field';
import { CherryField } from './game.cherry.field';
import { CollitionField } from './game.collition.field';
import { GameBoard } from './game.board';
import { GameDrawer } from './game.drawer';
import { SettingsService } from './settings.service';
import { CONTROLS, DIRECTIONS } from './game.constants';

@Component({
    selector: 'main-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    },
}
)

export class GameComponent implements DoCheck {
    private board: GameBoard;
    private snake: Snake;
    private gameDrawer: GameDrawer;
    private gameStarted: boolean = false;
    private waitKeyEvent: boolean = false;
    private score: number = 0;
    private highScore: number = 0;

    constructor(private settingsService: SettingsService) {
        this.board = new GameBoard();
        this.board.initialize(this.settingsService.getHeight(), this.settingsService.getWidth());
        this.gameDrawer = new GameDrawer(this.board);
        this.gameDrawer.initCss(this.settingsService.getHeight());
    }

    private startNewGame() {
        if (this.gameStarted === false) {
            this.settingsService.Disabled = true;
            this.score = 0;
            this.gameStarted = true;
            this.board.initialize(this.settingsService.getHeight(), this.settingsService.getWidth());
            this.intitalizeSnake();
            this.setRandomCherry();
            this.gameDrawer.draw(this.snake.getHead());
            this.move();
        }
    }

    private intitalizeSnake() {
        let yPos = Math.floor(Math.random() * this.board.Height);
        let xPos = Math.floor(Math.random() * this.board.Width);
        let direction = DIRECTIONS.RIGHT;
        this.snake = new Snake(0, 2, direction);
    }

    private move() {
        setTimeout(() => {
            this.waitKeyEvent = false;
            let oldHead = this.snake.copyHead();
            this.snake.move();
            let head = this.snake.getHead();
            this.validateNewPosition([head.Y, head.X]);
            this.controlCollition();

            if (this.gameStarted === true) {
                this.hasCherry([head.Y, head.X]);
                this.gameDrawer.erase(oldHead);
                this.gameDrawer.draw(head);
                this.move();
            }
        }, 250);
    }

    private validateNewPosition(position: number[]) {
        if (position[0] < 0) {
            position[0] = this.board.Width - 1;
            this.snake.resetHead(position);
        }
        else if (position[0] > this.board.Width - 1) {
            position[0] = 0;
            this.snake.resetHead(position);
        }
        else if (position[1] < 0) {
            position[1] = this.board.Height - 1;
            this.snake.resetHead(position);
        }
        else if (position[1] > this.board.Height - 1) {
            position[1] = 0;
            this.snake.resetHead(position);
        }
    }

    private controlCollition() {
        let head = this.snake.getHead();
        if (this.board.isSnakeField(head.Y, head.X)) {
            this.gameDrawer.draw(new CollitionField(head.Y, head.X));
            this.gameStarted = false;
            this.settingsService.Disabled = false;             
            
            if (this.score > this.highScore) {
                this.highScore = this.score;
            }
        }
    }

    private hasCherry(position: number[]): boolean {
        if (this.board.isCherryField(position[0], position[1])) {
            this.snake.eat(this.board.Height, this.board.Width);
            this.score++;
            this.setRandomCherry();
            return true;
        }
        return false;
    }

    private handleKeyboardEvents(e: KeyboardEvent) {
        if (!this.waitKeyEvent) {
            if (e.keyCode == CONTROLS.LEFT && this.snake.Direction !== DIRECTIONS.RIGHT) {
                this.snake.Direction = DIRECTIONS.LEFT;
            } else if (e.keyCode == CONTROLS.UP && this.snake.Direction !== DIRECTIONS.DOWN) {
                this.snake.Direction = DIRECTIONS.UP;
            } else if (e.keyCode == CONTROLS.RIGHT && this.snake.Direction !== DIRECTIONS.LEFT) {
                this.snake.Direction = DIRECTIONS.RIGHT;
            } else if (e.keyCode == CONTROLS.DOWN && this.snake.Direction !== DIRECTIONS.UP) {
                this.snake.Direction = DIRECTIONS.DOWN;
            }
            this.waitKeyEvent = true;
        }

    }

    private cancelGame() {
        this.gameStarted = false;
    }

    public ngDoCheck(): void {
        let height = this.settingsService.getHeight();
        let width = this.settingsService.getWidth()
        if (height != this.board.Height || width != this.board.Width) {
            this.board.initialize(height, width);
            if (height > width) {
                this.gameDrawer.initCss(this.settingsService.getHeight());
            }
            else {
                this.gameDrawer.initCss(this.settingsService.getWidth());
            }

        }
    }

    private getRandomDirection(boardHeight: number, boardWidth: number, yPos: number, xPos: number) {
        yPos += 1;
        xPos += 1;
        let yPercent = yPos / boardHeight * 100;
        let xPercent = xPos / boardWidth * 100;
        let yDivPercent = 100 - yPercent;
        let xDivPercent = 100 - xPercent;

        let directions: number[][] = [];
        if (yPercent < 30 && xPercent < 30) {
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.DOWN);
        }
        else if (yPercent < 30 && xDivPercent < 30) {
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.UP);
        }
        else if (yDivPercent < 30 && xDivPercent < 30) {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.UP);
        }
        else if (yDivPercent < 30 && xPercent < 30) {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.DOWN);
        }
        else if (yPercent < 30) {
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.UP);
            directions.push(DIRECTIONS.DOWN);
        }
        else if (xPercent < 30) {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.DOWN);
        }
        else if (yDivPercent < 30) {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.UP);
            directions.push(DIRECTIONS.DOWN);
        }
        else if (xDivPercent < 30) {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.UP);
        }
        else {
            directions.push(DIRECTIONS.LEFT);
            directions.push(DIRECTIONS.RIGHT);
            directions.push(DIRECTIONS.UP);
            directions.push(DIRECTIONS.DOWN);
        }

        let index = Math.floor(Math.random() * directions.length);
        return directions[index];
    }

    private setRandomCherry() {
        let yPos = Math.floor(Math.random() * this.board.Height);
        let xPos = Math.floor(Math.random() * this.board.Width);
        while (this.board.isSnakeField(yPos, xPos)) {
            yPos = Math.floor(Math.random() * this.board.Height);
            xPos = Math.floor(Math.random() * this.board.Width);
        }
        this.gameDrawer.draw(new CherryField(yPos, xPos));
    }
}