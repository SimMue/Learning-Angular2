import { Component } from '@angular/core';
import { SliderControlService } from './slider.control.service';
import { PainterService } from './painter.service'; 
import { WidthInitService } from './width.init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SliderControlService, PainterService, WidthInitService],
})

export class AppComponent {
  title = 'Paint';

  constructor(private sliderControlService: SliderControlService) { }

  private mouseMove(event: MouseEvent) {
    if (this.sliderControlService.getIsMouseDown()) {
      this.sliderControlService.notifyNewPosition(event.clientX);
    }
  }

  private mouseUp() {
    if (this.sliderControlService.getIsMouseDown() == true) {
      this.sliderControlService.setAndNotifyIsMouseDown(false);
    }
  }
}