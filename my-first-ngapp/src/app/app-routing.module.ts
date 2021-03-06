import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'app', component: AppComponent },
            { path: 'welcome', component: WelcomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'admin', component: AdminComponent },
            {
                path: '',
                redirectTo: '/welcome',
                pathMatch: 'full'
            },
            { path: '**', component: PageNotFoundComponent },
        ])
    ],
    exports: [
        RouterModule,
    ]
})


export class AppRoutingModule {

}