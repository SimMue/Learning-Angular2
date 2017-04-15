import { Component, DoCheck } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
    selector: 'main-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
}
)

export class GameComponent implements DoCheck {
    board: number[][];
    boardFieldSize : string;
    boardFieldMargin : string;   
    

    constructor(private settingsService: SettingsService) {        
        this.initBoard();
        this.initBoardFieldCss(this.settingsService.getHeight());
    }

    initBoard() {
        this.board = [];
        for (var c = 0; c < this.settingsService.getHeight(); c++) {
            var column = [];

            for (var r = 0; r < this.settingsService.getWidth(); r++) {
                column.push(0);
            }

            this.board.push(column);
        }
    }

    initBoardFieldCss(factor : number) {
        this.boardFieldSize = 90 / factor + "%";
        this.boardFieldMargin = 2 / factor + "%";
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