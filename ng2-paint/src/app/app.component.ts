import { Component } from '@angular/core';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SliderService],
})

export class AppComponent {
  title = 'Paint';

  constructor(private sliderService: SliderService) { }

  private mouseMove(event: MouseEvent) {
    if (this.sliderService.isMouseDown) {
      this.sliderService.notifyNewOffset(event.clientX);
    }
  }

  private mouseUp() {
    if (this.sliderService.isMouseDown == true)
    {
      this.sliderService.isMouseDown = false;
    }
  }
}