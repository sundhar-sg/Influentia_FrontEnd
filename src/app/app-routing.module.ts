import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AuthguardService } from './auth/authguard.service';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Influentia - Homepage"
    },
    {
        path: "contents/create-post",
        component: CreatepostComponent,
        title: "Influentia - Contents - Create a New Social Media Post",
        canActivate: [AuthguardService]
    },
    {
        path: "login",
        component: LoginSignupComponent,
        title: "Influentia - Login / Signup"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
