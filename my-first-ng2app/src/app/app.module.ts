import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { ProductsComponent } from './products.component';
import { AboutUsComponent } from './about-us.component';
import { AdminComponent } from './admin.component';
import { PageNotFoundComponent } from './page-not-found.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductsComponent,
    AboutUsComponent,
    AdminComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
