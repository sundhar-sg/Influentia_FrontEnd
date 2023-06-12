import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {

    private authToken: any = null;

    private loginStatus: boolean = false;

    constructor() {}

    setAuthToken(token: any): void {
        this.authToken = token;
        localStorage.setItem("authToken", token);
    }

    getAuthToken(): any {
        return this.authToken;
    }

    setLoginStatus(loginStatus: boolean): void {
        this.loginStatus = loginStatus;
    }

    getLoginStatus(): any {
        return this.loginStatus;
    }
}
