import { Component } from '@angular/core';
import { SignupDTO } from '../dto/signup-dto';
import { LoginsignuphttpService } from '../service/loginsignuphttp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../exception/error-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

    exceptionList: any = '';

    confirmPassword: string = '';

    confirmationException: string = '';

    private responseDTO: string = '';

    signupDTO: SignupDTO = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        planID: Number(''),
        paymentMode: "",
        validityDuration: "",
    }

    constructor(private httpService: LoginsignuphttpService) {}

    onSubmit() {
        if(this.signupDTO.password === this.confirmPassword) {
            this.signupDTO.planID = Number(this.signupDTO.planID);
            console.log(this.signupDTO.planID);
            this.httpService.signup(this.signupDTO)
                .subscribe({
                    next: (response) => {
                        alert("Signup Successfull :)");
                        this.responseDTO = response;
                    },
                    error: (error: HttpErrorResponse) => {
                        this.exceptionList = JSON.parse(error.error);
                        console.log(this.exceptionList.firstname);
                    }
                });
        } else {
            this.confirmationException = "Password and Confirm Password are not same. Enter the correct password";
        }
    }

    isFormValidated() {
        if(this.signupDTO.password === this.confirmPassword) {
            return false;
        }
        return true;
    }
}