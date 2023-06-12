import { Component } from '@angular/core';
import { UserPostDTO } from '../dto/userpost-dto';
import { ContentHttpService } from '../service/content-http.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {

    private exceptionMessages: {[key: string]: string} = {};

    createPostDTO: UserPostDTO = {
        isScheduledPost: false,
        publishedOnDate: new Date(),
        publishedOnTime: new Date(),
        postContentText: "",
        postAttachmentURL: "",
        postType: "",
        socialNetworkType: "",
        username: "",
        postStatus: "Scheduled"
    }

    constructor(private contentHttpService: ContentHttpService) {}

    onSubmit() {
        try {
            this.contentHttpService.createPost(this.createPostDTO).subscribe({
                next: (response) => {
                    alert("Post Successful!!!");
                }
            });
        } catch(ex) {
            if(typeof ex === 'object' && ex !== null) {
                const exception = ex as {inputName: string, message: string};
                this.exceptionMessages[exception.inputName] = exception.message;
            }
        }
    }
}