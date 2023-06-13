import { Component, Inject } from '@angular/core';
import { UserPostDTO } from '../dto/userpost-dto';
import { ContentHttpService } from '../service/content-http.service';
import { AuthTokenService } from '../shared/auth-token.service';
import jwtDecode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPostDisplayDTO } from '../dto/user-post-display-dto';

@Component({
  selector: 'app-listuserposts',
  templateUrl: './listuserposts.component.html',
  styleUrls: ['./listuserposts.component.css']
})

export class ListuserpostsComponent {

    exception: string = "";

    userPosts: UserPostDisplayDTO[] = [];

    currentTime = new Date();

    constructor(private httpService: ContentHttpService, private sharedService: AuthTokenService) {
        const username = this.sharedService.getAuthToken().sub;
        this.httpService.getUserPosts(username)
            .subscribe({
                next: (response: UserPostDisplayDTO[]) => {
                    this.userPosts = response;
                },
                error: (error: HttpErrorResponse) => {
                    this.exception = error.error;
                }
            });
    }
}