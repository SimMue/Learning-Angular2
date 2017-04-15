import { Component, DoCheck } from '@angular/core';
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
    board: boolean[][];    
    boardFieldSize : string;
    boardFieldMargin : string;
    direction : number[];
    position : number[];
    cancel : boolean = false;

    constructor(private settingsService: SettingsService) {
        this.position = [0, 0];
        this.direction = DIRECTIONS.RIGHT;
        this.initBoard();
        this.initBoardFieldCss(this.settingsService.getHeight());
    }

    initBoard() {
        this.board = [];
        for (var c = 0; c < this.settingsService.getHeight(); c++) {
            var column = [];

            for (var r = 0; r < this.settingsService.getWidth(); r++) {
                column.push(false);
            }

            this.board.push(column);
        }
        this.board[this.position[0]][this.position[1]] = true;
    }

    initBoardFieldCss(factor : number) {
        this.boardFieldSize = 75 / factor + "%";
        this.boardFieldMargin = 2 / factor + "%";
        
    }

    startNewGame() {
        this.move();
    }

    move() {
        setTimeout(() => {
                if (this.cancel === false){
                    this.board[this.position[0]][this.position[1]] = false;
                    this.validateNewPosition();
                    this.board[this.position[0]][this.position[1]] = true;

                    this.move();           
                }
                else
                {
                    this.cancel = false;
                }
        }, 500);
    }

    validateNewPosition() {
        this.position[0] = this.position[0] + this.direction[0];
        this.position[1] = this.position[1] + this.direction[1];
        if (this.position[1] > this.board.length-1){
             this.position[1] = 0;
        }
        else if (this.position[0] > this.board[0].length-1)
        {   
            this.position[0] = 0;
        }
    }

    handleKeyboardEvents(e: KeyboardEvent) {
		if (e.keyCode == CONTROLS.LEFT && this.direction !== DIRECTIONS.RIGHT) {
			this.direction = DIRECTIONS.LEFT;
		} else if (e.keyCode == CONTROLS.UP && this.direction !== DIRECTIONS.DOWN) {
			this.direction = DIRECTIONS.UP;
		} else if (e.keyCode == CONTROLS.RIGHT && this.direction !== DIRECTIONS.LEFT) {
			this.direction = DIRECTIONS.RIGHT;
		} else if (e.keyCode == CONTROLS.DOWN && this.direction !== DIRECTIONS.UP) {
			this.direction = DIRECTIONS.DOWN;
		}
	}

    cancelGame() {
        this.cancel = true;
    }

    ngDoCheck(): void {
        var height = this.settingsService.getHeight();
        var width = this.settingsService.getWidth()
        if (height != this.board.length || width != this.board[0].length){
            this.initBoard();
            if (height > width)
            {
                this.initBoardFieldCss(this.settingsService.getHeight());
            }
            else
            {
                this.initBoardFieldCss(this.settingsService.getWidth());
            }
            
        }
    }
}