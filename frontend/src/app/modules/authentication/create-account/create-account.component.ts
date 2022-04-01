import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CustomValidators } from 'src/app/shared/models/form-validations';
import { NewUser } from 'src/app/shared/models/new-user';
import { Notifications } from 'src/app/shared/models/notifications';
import { Pages } from 'src/app/shared/models/pages';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  hidePassword = true;
  hidePasswordConfirm = true;
  form!: FormGroup;


  get controls() { return this.form.controls; }


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,

  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, { validator: CustomValidators.mustMatch('password', 'passwordConfirm') });
  }

  signup() {
    if (!this.form.valid) {
      return;
    }

    this.authService.signuo(this.getNewUser())
      .then(response => {
        this.authService.handleResponse(response);
        let user = response as User;
        if (user.username) {
          this.router.navigate([Pages.Authentication.login]);
          this.notification.success(Notifications.userCreated)
        } else {
          this.notification.warning(Notifications.errorWhenRegistering)
        }
      });
  }

  getNewUser(): NewUser {
    let newUser = new NewUser();
    newUser.username = this.controls['username'].value;
    newUser.email = this.controls['email'].value;
    newUser.password = this.controls['password'].value;
    return newUser;
  }

  goToSignin() {
    this.router.navigate([Pages.Authentication.login]);

  }
}
