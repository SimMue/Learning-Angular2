import { Component } from '@angular/core';
import { WidthInitService } from './width.init.service';

@Component({
    selector: 'file-nav',
    templateUrl: './file.nav.component.html',
    styleUrls: ['./file.nav.component.css']
})

export class FileNavComponent {
    private width: number;

    constructor(private widthInitService: WidthInitService) {
        this.width = widthInitService.fileNavWidth;
    }
}