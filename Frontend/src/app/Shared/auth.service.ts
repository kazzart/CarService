import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Manager } from '../Interfaces/manager';

interface TokenData {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenLifetime: number = 3600;
  private login: string | undefined;
  private password: string | undefined;
  private accessToken: string | undefined;
  private refreshSubscription: any | undefined;
  public isAuthorzed: BehaviorSubject<boolean | undefined> =
    new BehaviorSubject<boolean | undefined>(undefined);

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    if (cookie.check('login') && cookie.check('password')) {
      let login = this.cookie.get('login');
      let password = this.cookie.get('password');
      this.signIn(login, password);
    } else {
      this.isAuthorzed.next(false);
    }
  }

  private async getToken(login: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let formdata = new FormData();
      formdata.append('username', login);
      formdata.append('password', password);
      try {
        let tokens: TokenData = await firstValueFrom(
          this.httpClient.post<TokenData>(
            environment.url + '/manager/sign_in/',
            formdata
          )
        );
        resolve(tokens.access_token);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async authorize(): Promise<boolean> {
    if (this.login != undefined && this.password != undefined) {
      try {
        let token = await this.getToken(this.login, this.password);
        this.accessToken = token;
        return Promise.resolve(true);
      } catch {
        this.logOut();
        return Promise.resolve(false);
      }
    } else {
      this.logOut();
      return Promise.resolve(false);
    }
  }

  public async signIn(login: string, password: string): Promise<void> {
    console.log(login);
    this.login = login;
    this.password = password;
    let result = await this.authorize();
    if (result) {
      this.cookie.set('login', login, undefined, '/');
      this.cookie.set('password', password, undefined, '/');
      this.isAuthorzed.next(true);
      this.refreshSubscription = setInterval(() => {
        this.authorize();
      }, this.tokenLifetime * 0.9 * 1000);

      this.router.navigate(['/']);
    }
  }

  public logOut(): void {
    this.login = undefined;
    this.password = undefined;
    this.accessToken = undefined;
    this.isAuthorzed.next(false);
    if (this.cookie.check('login')) {
      this.cookie.delete('login');
    }
    if (this.cookie.check('password')) {
      this.cookie.delete('password');
    }
    if (this.refreshSubscription != undefined) {
      clearInterval(this.refreshSubscription);
      this.refreshSubscription = undefined;
    }
    this.router.navigate(['/login']);
  }

  public getTokenHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
  }
}
