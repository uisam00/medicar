import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/authentication/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ToastPosition } from './shared/models/toastr-position';
import { ConfigService } from './core/services/config.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DEFAULT_FORMATS } from './shared/helpers/date-helper';
import { BaseService } from './core/services/base.service';
import { NotificationService } from './core/services/notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './shared/interceptors/request.interceptor.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { CreateAccountComponent } from './modules/authentication/create-account/create-account.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot({ preventDuplicates: true, progressBar: true, positionClass: ToastPosition.topRight }),
  ],
  providers: [
    [
      {
        provide: APP_INITIALIZER,
        multi: true,
        deps: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return () => {
            return configService.loadConfig();
          };
        }
      }
    ],
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    AuthGuard,
    BaseService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
