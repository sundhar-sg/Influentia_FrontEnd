import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatepostComponent } from './createpost/createpost.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListuserpostsComponent } from './listuserposts/listuserposts.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginAuthService } from './service/login-auth.service';
import { AuthTokenService } from './shared/auth-token.service';
import { AppauthGuard } from './guard/appauth.guard';
import { PostanalyticsComponent } from './postanalytics/postanalytics.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatepostComponent,
    HeaderComponent,
    HomeComponent,
    ListuserpostsComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    PostanalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginAuthService,
    AuthTokenService,
    AppauthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }