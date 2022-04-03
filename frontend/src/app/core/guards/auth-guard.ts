import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionStorage } from 'src/app/shared/models/constants';
import { Notifications } from 'src/app/shared/models/notifications';
import { Pages } from 'src/app/shared/models/pages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
    if (!this.authService.isUserLogged()) {
        return this.unauthorized();
    }
    return true;
  }
  unauthorized() {

    this.toastr.warning(Notifications.disconnect);
    this.authService.logout();
    return false;
  }
}
