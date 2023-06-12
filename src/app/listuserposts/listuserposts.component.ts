import { Component, Inject } from '@angular/core';
import { UserPostDTO } from '../dto/userpost-dto';
import { ContentHttpService } from '../service/content-http.service';

@Component({
  selector: 'app-listuserposts',
  templateUrl: './listuserposts.component.html',
  styleUrls: ['./listuserposts.component.css']
})

export class ListuserpostsComponent {

    private exception: string = "";

    userPosts: UserPostDTO[] = [];

    constructor(private httpService: ContentHttpService) {

        try {
            this.httpService.getUserPosts("").subscribe({
                next: (response: any[]) => {
                    this.userPosts = response;
                }
            });
        } catch(ex) {
            if(typeof ex === "string" && ex !== null) {
                alert(ex);
            }
        }
    }


}