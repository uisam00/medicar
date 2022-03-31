import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';

import { Notifications } from 'src/app/shared/models/notifications';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { SessionStorage } from 'src/app/shared/models/constants';
import { Pages } from 'src/app/shared/models/pages';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(this.addAuthToken(request)).pipe(
            
            
            catchError((requestError: HttpErrorResponse) => {
                console.log(request);
                if (requestError.status === 401) {
                    localStorage.clear();
                    sessionStorage.clear();
                    if(request.url.includes(Pages.Authentication.login)){
                        this.toastr.error(Notifications.invalidCredentials);
                    }else{
                        this.toastr.error(Notifications.disconnect);
                        this.router.navigate([Pages.Authentication.login]);
                    }  
                }
                else if (requestError.status === 403) {
                    this.toastr.error(Notifications.withoutPermission);
                }
                else {
                    this.toastr.error(Notifications.genericError);
                }
                
                return throwError(() => new Error(requestError.message));
            }),
            finalize(() => {})
        );
    }

    private addAuthToken(request: HttpRequest<any>) {

        let token = sessionStorage.getItem(SessionStorage.token);

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