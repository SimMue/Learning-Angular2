import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    private BOARD_HEIGHT: number = 10;    
    private BOARD_WIDTH: number = 10;

    getHeight(): number {
        return this.BOARD_HEIGHT;
    }

    getWidth(): number {
        return this.BOARD_WIDTH;
    }

    setBoardSize(height: number, width: number) {
        this.BOARD_HEIGHT = height;
        this.BOARD_WIDTH = width;
    }
}