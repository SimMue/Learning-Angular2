import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    private BOARD_HEIGHT: number = 10;    
    private BOARD_WIDTH: number = 10;
    public Disabled = false;

    public getHeight(): number {
        return this.BOARD_HEIGHT;
    }

    public getWidth(): number {
        return this.BOARD_WIDTH;
    }

    public setBoardSize(height: number, width: number) {
        this.BOARD_HEIGHT = height;
        this.BOARD_WIDTH = width;
    }
}