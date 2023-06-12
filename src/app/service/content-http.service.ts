import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPostDTO } from '../dto/userpost-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentHttpService {
    private baseUrl = "http://localhost:8080/api/content";

    constructor(private http: HttpClient) { }

    createPost(createPostDTO: UserPostDTO): Observable<any> {
        const url = `${this.baseUrl}/add`;
        return this.http.post(url, createPostDTO);
    }

    getUserPosts(username: string): Observable<any[]> {
        const url = `${this.baseUrl}/{username}`.replace('username', username);
        return this.http.get<any[]>(url);
    }
}