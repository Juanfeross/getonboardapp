import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorServices } from '@core/interceptor/interceptor.interceptor';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationModule } from '@core/confirmation/confirmation.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '@environment/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

export function tokenGetter2() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SpinnerModule,
    AuthModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    ConfirmationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter2,
        // whitelistedDomains: [environment.endpointv1],
        // blacklistedRoutes: [environment.endpointv1 + '/account/login']
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServices,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
