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

    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(private httpService: ContentHttpService, private sharedService: AuthTokenService) {}

    selectedInsightType() {
        return this.insightType;
    }

    resultSet(): any[] {
        const username = this.sharedService.getAuthToken().sub;
        if(this.insightType === 'Month') {
            
        }
    }
}
