import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LocalStorage, SessionStorage, ROUTES_USER_API } from 'src/app/shared/models/constants';
import { UserCredentials } from 'src/app/shared/models/user-credentials';

import { UserToken } from '../../shared/models/user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private token: string = '';

  constructor(
    protected notification: NotificationService,
    protected http: HttpClient,
    protected config: ConfigService) {
    super(notification, http, config)
  }
  public get getToken() {
    return this.token;
  }

  isUserLogged() {
    const tokenSession = sessionStorage.getItem(SessionStorage.token) ?? '';
    const tokenLocal = localStorage.getItem(LocalStorage.token) ?? '';
    if (tokenSession) {
      this.token = tokenSession;
      return true;
    } else if (tokenLocal) {
      this.token = tokenLocal;
      return true;
    } else {
      return false;
    }
  }

  login(credentials: UserCredentials): Promise<UserToken | undefined> {
    return this.http.post<UserToken>(this.urlApi + ROUTES_USER_API.login, credentials).toPromise();
  }
}
