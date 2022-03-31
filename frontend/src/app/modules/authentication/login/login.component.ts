import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage } from 'src/app/shared/models/constants';
import { Pages } from 'src/app/shared/models/pages';
import { AuthService } from '../../../core/services/auth.service';

import { UserToken } from '../../../shared/models/user-token';
import { UserCredentials } from 'src/app/shared/models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  hidePassword = true;
  form: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberPassword: [false ],

  });

  get controls() { return this.form.controls; }
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  login() {    
    if (!this.form.valid) {
      return;
    }
   
    this.authService.login(this.getCredentials())
      .then(response => {
        this.authService.handleResponse(response);
        if (response?.token) {
          let userToken = response as UserToken;
          if(this.controls["rememberPassword"].value){
            localStorage.setItem(LocalStorage.token, userToken.token);

          }else{
            sessionStorage.setItem(SessionStorage.token, userToken.token);

          }
          this.router.navigate([Pages.Authentication.signup]);

        }else{

        }
      });
  }

  getCredentials(): UserCredentials {
    let credentials = new UserCredentials();
    credentials.username = this.controls['user'].value;
    credentials.password = this.controls['password'].value;
    return credentials;
  }

  goToSignup(){
    this.router.navigate([Pages.Authentication.signup]);

  }
}
