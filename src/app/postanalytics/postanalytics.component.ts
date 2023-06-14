import { Component } from '@angular/core';
import { ContentHttpService } from '../service/content-http.service';
import { AuthTokenService } from '../shared/auth-token.service';

@Component({
  selector: 'app-postanalytics',
  templateUrl: './postanalytics.component.html',
  styleUrls: ['./postanalytics.component.css']
})
export class PostanalyticsComponent {

    insightType: string = '';

    monthValue: string = "";
    yearValue: string = '';

    insightValue: string = '';

    startDate: string = '';
    endDate: string = '';

    finalReport: any[] = [];

    constructor(private httpService: ContentHttpService, private sharedService: AuthTokenService) {}

    selectedInsightType() {
        return this.insightType;
    }

    resultSet() {
        const username = this.sharedService.getAuthToken().sub;
        let socialAccountsUsed = this.httpService.socialAccountsByUsername(username);
        const postTypes : string[] = ['Text', 'Image', 'Video'];
        let accountInsights: any[] = [];
        let queryResult: {[key: string]: string | number; } = {};
        if(this.insightType === 'Month') {
            // socialAccountsUsed.forEach(socialAccountType => {
            //     socialAccountType.forEach(accountType => {
            //         queryResult['socialAccountType'] = accountType;
            //         this.analyticsDTO.push(queryResult);
            //         postTypes.forEach(postType => {
            //             const tempResult = this.httpService.filteringUserPostsByMonth(username, this.monthValue, Number(this.yearValue), accountType, postType);
            //             tempResult.subscribe((value) => {
            //                 queryResult[`${postType} Post`] = value;
            //             });
            //             this.analyticsDTO.push(queryResult);
            //         })
            //     })
            // });
        } else if(this.insightType === 'Quarter') {
            socialAccountsUsed.forEach((accountTypes) => {
                accountTypes.forEach((accountType) => {
                    accountInsights = [];
                    queryResult['socialAccountType'] = accountType;
                    alert(queryResult['socialAccountType']);
                    accountInsights.push(queryResult);
                    postTypes.forEach((postType) => {
                        let tempResult = this.httpService.filteringUserPostsByQuarter(username, this.insightValue, Number(this.yearValue), accountType, postType);
                        tempResult.subscribe((value) => {
                            queryResult[`${postType} Post`] = value;
                            console.log(queryResult);
                        })
                        accountInsights.push(queryResult);
                    })
                    this.finalReport.push(accountInsights);
                })
            })
            // console.log(this.finalReport);
        } else if(this.insightType === 'HalfYear') {
            // socialAccountsUsed.forEach(socialAccountType => {
            //     socialAccountType.forEach(accountType => {
            //         queryResult['socialAccountType'] = accountType;
            //         this.analyticsDTO.push(queryResult);
            //         postTypes.forEach(postType => {
            //             const tempResult =  this.httpService.filteringUserPostsByHalfYearly(username, this.insightValue, Number(this.yearValue), accountType, postType);
            //             tempResult.subscribe((value) => {
            //                 queryResult[`${postType} Post`] = value;
            //             });
            //             this.analyticsDTO.push(queryResult);
            //         })
            //     })
            // });
        } else if(this.insightType === 'Year') {
            // socialAccountsUsed.forEach(socialAccountType => {
            //     socialAccountType.forEach(accountType => {
            //         queryResult['socialAccountType'] = accountType;
            //         this.analyticsDTO.push(queryResult);
            //         postTypes.forEach(postType => {
            //             const tempResult = this.httpService.filteringUserPostsByYearly(username, Number(this.yearValue), accountType, postType);
            //             tempResult.subscribe((value) => {
            //                 queryResult[`${postType} Post`] = value;
            //             });
            //             this.analyticsDTO.push(queryResult);
            //         })
            //     })
            // });
        } else if(this.insightType === 'Custom') {
            // socialAccountsUsed.forEach(socialAccountType => {
            //     socialAccountType.forEach(accountType => {
            //         queryResult['socialAccountType'] = accountType;
            //         this.analyticsDTO.push(queryResult);
            //         postTypes.forEach(postType => {
            //             const tempResult = this.httpService.filteringUserPostsByCustomInsights(username, this.startDate, this.endDate, accountType, postType);
            //             tempResult.subscribe((value) => {
            //                 queryResult[`${postType} Post`] = value;
            //             });
            //             this.analyticsDTO.push(queryResult);
            //         })
            //     })
            // });
        }
    }
}