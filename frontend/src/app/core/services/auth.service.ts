import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LocalStorage, SessionStorage, ROUTES_USER_API } from 'src/app/shared/models/constants';
import { NewUser } from 'src/app/shared/models/new-user';
import { Pages } from 'src/app/shared/models/pages';
import { UserCredentials } from 'src/app/shared/models/user-credentials';

import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private token: string = '';
  private username: string = '';


  constructor(
    protected notification: NotificationService,
    private router: Router,
    protected http: HttpClient,
    protected config: ConfigService) {
    super(notification, http, config)
  }
  public get getToken() {
    return this.token;
  }
  public get getUsername() {
    return this.username;
  }

  isUserLogged() {
    const tokenSession = sessionStorage.getItem(SessionStorage.token) ?? '';
    const tokenLocal = localStorage.getItem(LocalStorage.token) ?? '';
    const usernameLocal = localStorage.getItem(LocalStorage.username) ?? '';
    const usernameSession = sessionStorage.getItem(SessionStorage.username) ?? '';
    if (tokenSession) {
      this.token = tokenSession;
      this.username = usernameSession;
      return true;
    } else if (tokenLocal) {
      this.token = tokenLocal;
      this.username = usernameLocal;
      return true;
    } else {
      return false;
    }
  }

  login(credentials: UserCredentials): Promise<User | undefined> {
    return this.http.post<User>(this.urlApi + ROUTES_USER_API.login, credentials).toPromise();
  }

  signuo(newUser: NewUser): Promise<User | undefined> {
    return this.http.post<User>(this.urlApi + ROUTES_USER_API.signup, newUser).toPromise();
  }
}
