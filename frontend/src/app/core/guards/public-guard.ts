import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Pages } from 'src/app/shared/models/pages';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let path = route.routeConfig?.path;

    if (this.authService.isUserLogged() && (path === 'cadastrar' || path === 'login' || path === '')) {

      this.router.navigate([Pages.ClinicalConsultations.initialRoute]);

      return false;
    }
    return true;
  }

}
