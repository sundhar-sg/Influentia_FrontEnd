import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatepostComponent } from './createpost/createpost.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Influentia - Homepage"
    },
    {
        path: "contents/create-post",
        component: CreatepostComponent,
        title: "Influentia - Contents - Create a New Social Media Post"
    }
];

@NgModule({
  declarations: [
    AppComponent,
    CreatepostComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
