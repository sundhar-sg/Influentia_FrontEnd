import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
    
    loadedFeature: string = 'login';

    @Output() featureSelected = new EventEmitter<string>();

    OnSelect(feature: string) {
        this.featureSelected.emit(feature);
        this.loadedFeature = feature;
    }

    ngOnInit(): void {
        
    }

}