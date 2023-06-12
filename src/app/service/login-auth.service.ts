import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../dto/user-dto';
import { Observable, tap } from 'rxjs';
import { AuthTokenService } from '../shared/auth-token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

    private url = 'http://localhost:8080/api';

    private loggedIn: boolean = false;

    constructor(private httpClient: HttpClient, private sharedService: AuthTokenService, public router: Router) { }

    login(userDTO: UserDTO): Observable<any> {
        if(userDTO.username && userDTO.password) {
            this.loggedIn = true;
            return this.httpClient.post<any>(this.url + '/login', userDTO).pipe(
                tap(response => {
                    if(response && response.token) {
                        this.sharedService.setLoginStatus(this.loggedIn);
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
                this.sharedService.setLoginStatus(this.loggedIn);
                localStorage.removeItem("authToken");
                this.router.navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                        this.router.navigate(['/']);
                    })
            })
    }

    getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}