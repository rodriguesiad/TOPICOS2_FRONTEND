import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SituacaoDialogBoxComponent } from 'src/app/shared/components/situacao-dialog-box/situacao-dialog-box.component';
import { MatButtonModule } from '@angular/material/button';
// import { AuthRoutingModule } from './auth/auth-routing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
// import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SituacaoDialogBoxComponent
  ],
  imports: [
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => localStorage.getItem('jwt_token'),
    //     allowedDomains: ['unitins.br'],
    //     disallowedRoutes: ['localhost:8080/login']
    //   }
    // }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    // AuthRoutingModule
  ],
  providers: 
  [
    //JwtHelperService,
    // 
  //   { provide: LOCALE_ID, useValue: 'pt' },
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
