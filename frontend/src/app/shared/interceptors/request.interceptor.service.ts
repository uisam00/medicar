import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Notifications } from 'src/app/shared/models/notifications';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { Pages } from 'src/app/shared/models/pages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService, private authService: AuthService,  private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(this.addAuthToken(request)).pipe(
            catchError((requestError: HttpErrorResponse) => {
                if (requestError.status === 401 || requestError.status === 403) {
                    this.authService.clearUserSession();
                    this.ifIsLoggedNotification();
                }
                else {
                    this.toastr.warning(Notifications.genericError);
                }

                return throwError(() => new Error(requestError.message));
            }),
            finalize(() => {this.spinner.hide();})
        );
    }

    private ifIsLoggedNotification() {
        let token = this.authService.getToken
        if (StringHelper.isNullOrEmpty(token)) {
            this.toastr.warning(Notifications.invalidCredentials);
        }else{
            this.toastr.warning(Notifications.disconnect);
            this.router.navigate([Pages.Authentication.login]);
        }
    }

    private addAuthToken(request: HttpRequest<any>) {

        let token = this.authService.getToken

        if (!StringHelper.isNullOrEmpty(token)) {
            return request.clone({
                setHeaders: {
                    ContentType: 'application/json',
                    Authorization: `Token ${token}`
                }
            });
        } else {
            return request;
        }

    }
}