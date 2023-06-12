export interface UserPostDTO {

    isScheduledPost: boolean;

    publishedOnDate: Date;

    publishedOnTime: Date;

    postType: string;

    postContentText: string;

    postAttachmentURL: string;

    username: string;

    socialNetworkType: string;

    postStatus: string;
}