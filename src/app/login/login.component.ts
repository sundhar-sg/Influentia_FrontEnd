import { Component } from '@angular/core';
import { UserDTO } from '../dto/user-dto';
import { jwtDecode } from 'jwt-decode';
import { LoginAuthService } from '../service/login-auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    userDTO: UserDTO = {
        username: '',
        password: ''
    }

    exception: string = '';

    responseDTO: any = '';    

    constructor(private httpService: LoginAuthService, private router: Router) {}

    onSubmit() {
        this.httpService.login(this.userDTO)
            .subscribe({
                next: (response) => {
                    // alert("Login Successfull :)");
                    this.responseDTO = jwtDecode(response.token);
                    this.httpService.setToken(response.token);
                    this.router.navigate(['']);
                },
                error: (error: HttpErrorResponse) => {
                    this.exception = error.error;
                }
            });
    }
}