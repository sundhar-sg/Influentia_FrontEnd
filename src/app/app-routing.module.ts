import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AppauthGuard } from './guard/appauth.guard';
import { ListuserpostsComponent } from './listuserposts/listuserposts.component';
import { PostanalyticsComponent } from './postanalytics/postanalytics.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Influentia - Homepage"
    },
    {
        path: "login",
        component: LoginSignupComponent,
        title: "Influentia - Login / Signup"
    },
    {
        path: "contents/create-post",
        component: CreatepostComponent,
        title: "Influentia - Contents - Create a New Social Media Post",
        canActivate: [AppauthGuard]
    },
    {
        path: "contents/all-posts",
        component: ListuserpostsComponent,
        title: "Influentia - Contents - All Posts by you",
        canActivate: [AppauthGuard]
    },
    {
        path: "contents/post-analytics",
        component: PostanalyticsComponent,
        title: "Influentia - Contents - Post Analytics"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
