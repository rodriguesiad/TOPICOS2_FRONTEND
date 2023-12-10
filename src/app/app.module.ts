import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SituacaoDialogBoxComponent } from 'src/app/shared/components/situacao-dialog-box/situacao-dialog-box.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SituacaoDialogBoxComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: ['unitins.br'],
        disallowedRoutes: ['localhost:8080/auth']
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    AuthRoutingModule
  ],
  providers:
    [
      JwtHelperService,

      { provide: LOCALE_ID, useValue: 'pt' },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
