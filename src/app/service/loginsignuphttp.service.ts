import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../dto/user-dto';
import { Observable } from 'rxjs';
import { SignupDTO } from '../dto/signup-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginsignuphttpService {

    private baseUrl: string = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    signup(signupDTO: SignupDTO): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        return this.http.post(url, signupDTO, {responseType: 'text'});
    }

}