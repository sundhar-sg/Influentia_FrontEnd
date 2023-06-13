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

    currentTime: string = '';

    currentDate: string = '';

    constructor(private contentHttpService: ContentHttpService) {
        const date = new Date();
        this.currentDate = date.toISOString().split("T")[0];
        this.currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    onSubmit() {
        try {
            alert(this.createPostDTO.publishedOnDate);
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