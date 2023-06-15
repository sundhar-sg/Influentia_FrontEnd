import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../dto/user-dto';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

    private url = 'http://localhost:8080/api';

    private loggedIn: boolean = false;

    constructor(private httpClient: HttpClient, public router: Router) { }

    login(userDTO: UserDTO): Observable<any> {
        if(userDTO.username && userDTO.password) {
            this.loggedIn = true;
            return this.httpClient.post<any>(this.url + '/login', userDTO).pipe(
                tap(response => {
                    if(response && response.token) {
                        localStorage.setItem("authToken", response.token);
                    }
                })
            );
        }
        return <any>(null);
    }

    logout(): void {
        this.httpClient.post<void>(this.url + '/logout', {})
            .subscribe(() => {
                this.loggedIn = false;
                localStorage.removeItem("authToken");
                this.router.navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                        this.router.navigate(['/']);
                    })
            })
    }

    getToken(): any {
        if(localStorage.getItem("authToken") !== null)
            return jwtDecode(localStorage.getItem("authToken") || "");
        return null;
    }

    setToken(token: any): void {
        localStorage.setItem("authToken", token);
    }

    isLoggedIn(): boolean {
        if(this.getToken() !== null) 
            this.loggedIn = true;
        else
            this.loggedIn = false;
        return this.loggedIn;
    }
}