import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { PersonDetailComponent } from './person/person-detail.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PersonService } from './person/person.service'

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
    PersonDetailComponent,
    PageNotFoundComponent,
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})

export class AppModule { }
