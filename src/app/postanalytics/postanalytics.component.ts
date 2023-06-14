import { Component } from '@angular/core';
import { ContentHttpService } from '../service/content-http.service';
import { AuthTokenService } from '../shared/auth-token.service';
import { AnalyticsDTO } from '../dto/analytics-dto';

@Component({
  selector: 'app-postanalytics',
  templateUrl: './postanalytics.component.html',
  styleUrls: ['./postanalytics.component.css']
})
export class PostanalyticsComponent {

    username: string = '';

    insightType: string = '';

    monthValue: string = "";
    yearValue: string = '';

    insightValue: string = '';

    startDate: string = '';
    endDate: string = '';

    formattedStartDate: string = '';
    formattedEndDate: string = '';

    finalReport: AnalyticsDTO[] = [];

    constructor(private httpService: ContentHttpService, private sharedService: AuthTokenService) {}

    selectedInsightType() {
        return this.insightType;
    }

    checkLeapYear() {
        if((Number(this.yearValue) % 4 === 0 && Number(this.yearValue) % 100 === 0) || (Number(this.yearValue) % 400 === 0))
            return true;
        return false;
    }

    formattedDates(dateParameter: string) {
        const dateParts = dateParameter.split("-");
        const year = dateParts[0];
        const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(dateParameter));
        const day = ("0" + dateParts[2]).slice(-2);
        return `${day} ${month} ${year}`;
    }

    resultSet() {
        this.username = this.sharedService.getAuthToken().sub;
        let socialAccountsUsed = this.httpService.socialAccountsByUsername(this.username);
        const postTypes : string[] = ['Text', 'Image', 'Video'];
        this.finalReport = [];
        if(this.insightType === 'Month') {
            socialAccountsUsed.forEach((socialAccountsArray) => {
                socialAccountsArray.forEach((accountType => {
                    let accountInsights: AnalyticsDTO = {
                        socialAccountType: accountType,
                        imagePosts: 0,
                        textPosts: 0,
                        videoPosts: 0
                    };
                    postTypes.forEach((postType => {
                        let queryResult = this.httpService.filteringUserPostsByMonth(this.username, this.monthValue, Number(this.yearValue), accountType, postType);
                        queryResult.subscribe((value) => {
                            if(postType === 'Text')
                                accountInsights.textPosts = value;
                            else if(postType === 'Image')
                                accountInsights.imagePosts = value;
                            else if(postType === 'Video')
                                accountInsights.videoPosts = value;
                        })
                    }))
                    this.finalReport.push(accountInsights);
                }))
            })
        } else if(this.insightType === 'Quarter') {
            socialAccountsUsed.forEach((socialAccountsArray) => {
                socialAccountsArray.forEach((accountType => {
                    let accountInsights: AnalyticsDTO = {
                        socialAccountType: accountType,
                        imagePosts: 0,
                        textPosts: 0,
                        videoPosts: 0
                    };
                    postTypes.forEach((postType => {
                        let queryResult = this.httpService.filteringUserPostsByQuarter(this.username, this.insightValue, Number(this.yearValue), accountType, postType);
                        queryResult.subscribe((value) => {
                            if(postType === 'Text')
                                accountInsights.textPosts = value;
                            else if(postType === 'Image')
                                accountInsights.imagePosts = value;
                            else if(postType === 'Video')
                                accountInsights.videoPosts = value;
                        })
                    }))
                    this.finalReport.push(accountInsights);
                }))
            })
        } else if(this.insightType === 'HalfYear') {
            socialAccountsUsed.forEach((socialAccountsArray) => {
                socialAccountsArray.forEach((accountType => {
                    let accountInsights: AnalyticsDTO = {
                        socialAccountType: accountType,
                        imagePosts: 0,
                        textPosts: 0,
                        videoPosts: 0
                    };
                    postTypes.forEach((postType => {
                        let queryResult = this.httpService.filteringUserPostsByHalfYearly(this.username, this.insightValue, Number(this.yearValue), accountType, postType);
                        queryResult.subscribe((value) => {
                            if(postType === 'Text')
                                accountInsights.textPosts = value;
                            else if(postType === 'Image')
                                accountInsights.imagePosts = value;
                            else if(postType === 'Video')
                                accountInsights.videoPosts = value;
                        })
                    }))
                    this.finalReport.push(accountInsights);
                }))
            })
        } else if(this.insightType === 'Year') {
            socialAccountsUsed.forEach((socialAccountsArray) => {
                socialAccountsArray.forEach((accountType => {
                    let accountInsights: AnalyticsDTO = {
                        socialAccountType: accountType,
                        imagePosts: 0,
                        textPosts: 0,
                        videoPosts: 0
                    };
                    postTypes.forEach((postType => {
                        let queryResult = this.httpService.filteringUserPostsByYearly(this.username, Number(this.yearValue), accountType, postType);
                        queryResult.subscribe((value) => {
                            if(postType === 'Text')
                                accountInsights.textPosts = value;
                            else if(postType === 'Image')
                                accountInsights.imagePosts = value;
                            else if(postType === 'Video')
                                accountInsights.videoPosts = value;
                        })
                    }))
                    this.finalReport.push(accountInsights);
                }))
            })
        } else if(this.insightType === 'Custom') {
            this.formattedStartDate = this.formattedDates(this.startDate);
            this.formattedEndDate = this.formattedDates(this.endDate);
            socialAccountsUsed.forEach((socialAccountsArray) => {
                socialAccountsArray.forEach((accountType => {
                    let accountInsights: AnalyticsDTO = {
                        socialAccountType: accountType,
                        imagePosts: 0,
                        textPosts: 0,
                        videoPosts: 0
                    };
                    postTypes.forEach((postType => {
                        let queryResult = this.httpService.filteringUserPostsByCustomInsights(this.username, this.startDate, this.endDate, accountType, postType);
                        queryResult.subscribe((value) => {
                            if(postType === 'Text')
                                accountInsights.textPosts = value;
                            else if(postType === 'Image')
                                accountInsights.imagePosts = value;
                            else if(postType === 'Video')
                                accountInsights.videoPosts = value;
                        })
                    }))
                    this.finalReport.push(accountInsights);
                }))
            })
        }
    }
}