import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
    selector: 'game-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})

export class SettingsComponent {
    constructor(private settingsService: SettingsService) { }
    
    height = this.settingsService.getHeight();    
    width = this.settingsService.getWidth();
    title = "Settings";
    

    private setBoardSize() {
        this.settingsService.setBoardSize(this.height, this.width);
    }
}