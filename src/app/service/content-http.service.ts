import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPostDTO } from '../dto/userpost-dto';
import { Observable, map } from 'rxjs';
import { UserPostDisplayDTO } from '../dto/user-post-display-dto';

@Injectable({
  providedIn: 'root'
})
export class ContentHttpService {
    private baseUrl = "http://localhost:8080/api/content";

    private offsetInMillis = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;

    constructor(private http: HttpClient) { }

    createPost(createPostDTO: UserPostDTO): Observable<string> {
        const url = `${this.baseUrl}/add`;
        return this.http.post(url, createPostDTO, { responseType: 'text' });
    }

    getUserPosts(username: string): Observable<UserPostDisplayDTO[]> {
        const url = `${this.baseUrl}/${username}/all-posts`;
        return this.http.get<UserPostDisplayDTO[]>(url, { responseType: "json" })
        .pipe(
            map(
                response => {
                    return response.map(
                        post => {
                            return {
                                ...post,
                                postedOn: new Date(post.postedOn),
                                publishedOnDate: new Date(new Date(`${post.publishedOnDate}T${post.publishedOnTime}:00Z`).getTime() - this.offsetInMillis),
                                publishedOnTime: new Date(new Date(`${post.publishedOnDate}T${post.publishedOnTime}:00Z`).getTime() - this.offsetInMillis)
                            }
                        }
                    )
                }
            )
        );
    }

    cancelUserPosts(postID: number, username: string): Observable<string> {
        const url = `${this.baseUrl}/cancel-post`;
        let data = {postID: postID, username: username};
        return this.http.put(url, data, { responseType: 'text' });
    }

    socialAccountsByUsername(username: string): Observable<string[]> {
        const url = `${this.baseUrl}/post-analytics/${username}`;
        return this.http.get<string[]>(url);
    }

    filteringUserPostsByMonth(username: string, month: string, year: number, socialAccountType: string, postType: string): Observable<number> {
        const url = `${this.baseUrl}/post-analytics/monthly/${username}/${month}/${year}/${socialAccountType}/${postType}`;
        return this.http.get<number>(url, { responseType: 'json' });
    }

    filteringUserPostsByQuarter(username: string, quarterType: string, year: number, socialAccountType: string, postType: string): Observable<number> {
        const url = `${this.baseUrl}/post-analytics/quarterly/${username}/${quarterType}/${year}/${socialAccountType}/${postType}`;
        return this.http.get<number>(url, { responseType: "json" });
    }

    filteringUserPostsByHalfYearly(username: string, halfYearlyType: string, year: number, socialAccountType: string, postType: string): Observable<number> {
        const url = `${this.baseUrl}/post-analytics/half-yearly/${username}/${halfYearlyType}/${year}/${socialAccountType}/${postType}`;
        return this.http.get<number>(url, { responseType: 'json' });
    }

    filteringUserPostsByYearly(username: string, year: number, socialAccountType: string, postType: string): Observable<number> {
        const url = `${this.baseUrl}/post-analytics/yearly/${username}/${year}/${socialAccountType}/${postType}`;
        return this.http.get<number>(url, { responseType: 'json' });
    }

    filteringUserPostsByCustomInsights(username: string, startDate: string, endDate: string, socialAccountType: string, postType: string): Observable<number> {
        const url = `${this.baseUrl}/post-analytics/custom/${username}/${startDate}/${endDate}/${socialAccountType}/${postType}`;
        return this.http.get<number>(url, { responseType: "json" });
    }
}