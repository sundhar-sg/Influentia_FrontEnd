import { Component } from '@angular/core';
import { ContentHttpService } from '../service/content-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPostDisplayDTO } from '../dto/user-post-display-dto';
import { LoginAuthService } from '../service/login-auth.service';

@Component({
  selector: 'app-listuserposts',
  templateUrl: './listuserposts.component.html',
  styleUrls: ['./listuserposts.component.css']
})

export class ListuserpostsComponent {

    exception: string = "";

    userPosts: UserPostDisplayDTO[] = [];

    currentTime = new Date();
    
    username = this.loginAuth.getToken().sub;

    constructor(private httpService: ContentHttpService, private loginAuth: LoginAuthService) {
        this.httpService.getUserPosts(this.username)
            .subscribe({
                next: (response: UserPostDisplayDTO[]) => {
                    this.userPosts = response;
                },
                error: (error: HttpErrorResponse) => {
                    this.exception = error.error;
                }
            });
    }

    cancelPost(button: Event | null) {
        let target = button?.target as HTMLButtonElement;
        let value = target.value;
        this.httpService.cancelUserPosts(Number(value), this.username)
            .subscribe({
                next: (response) => {
                    alert(response);
                },
                error: (errorResponse) => {
                    alert(errorResponse);
                }
            })
    }
}