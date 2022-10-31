import { Injectable, Injector } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private jwtHelper: JwtHelperService) {}

  public getTokenPayload(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
  public getTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  public getTokenExpirationDate(token: string) {
    return this.jwtHelper.getTokenExpirationDate(token);
  }
}
