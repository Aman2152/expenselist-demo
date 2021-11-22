import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';
  private userId = '';
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userEmail: string | null;

  constructor(private http: HttpClient, private router: Router) { }

  public createUser(user: User) {
    // const authData: AuthData = { email, password };
    this.http.post('http://localhost:4000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
        // this.router.navigate(['/login']);
        this.login(user.email, user.password);
      });
  }

  public login(email: string, password: string) {
    const authData = { email, password };
    this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:4000/api/user/login', authData)
      .subscribe(response => {
        if (response.token) {
          this.token = response.token;
          this.userId = response.userId;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(response.expiresIn);

          this.isAuthenticated = true;
          this.userEmail = authData.email;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationDate, this.userId, authData.email);
          this.router.navigate(['/expenses']);
        }
      });
  }

  public autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userEmail = authInformation.email;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  public logout(): void {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    return this.token;
  }

  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  public getUserEmail() {
    return this.userEmail;
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number): any {
    console.log("setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(): AuthData {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId') || '';
    const expirationDate = localStorage.getItem('expiration');
    const userEmail = localStorage.getItem('email');
    if (!token || !expirationDate) {
      return {
        token: '',
        userId: '',
        email: '',
        expirationDate: new Date()
      };
    }
    return {
      token: token,
      userId: userId,
      email: userEmail,
      expirationDate: new Date(expirationDate)
    };
  }
}

