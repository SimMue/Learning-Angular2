import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToolBoxComponent } from './tool/tool.box.component';
import { FileNavComponent } from './file/file.nav.component';
import { SliderControlComponent } from './slider/slider.control.component';
import { PaintSheetComponent } from './paint/paint.sheet.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBoxComponent,
    FileNavComponent,
    SliderControlComponent,
    PaintSheetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
