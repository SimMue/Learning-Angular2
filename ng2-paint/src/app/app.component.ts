import { Component } from '@angular/core';
import { SliderControlService } from './slider/slider.control.service';
import { WidthInitService } from './slider/width.init.service';
import { PainterToolService } from './paint/painter.tool.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SliderControlService, PainterToolService, WidthInitService],
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