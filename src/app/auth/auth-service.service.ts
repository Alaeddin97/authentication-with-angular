import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../user/user.model';

interface AuthResData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  lacalIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=key',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.lacalIn,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=key',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.lacalIn,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);

          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['auth']);
    this.user.next(null);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      if (new Date() > new Date(userData._tokenExpirationDate)) {
        return;
      } else {
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        this.user.next(loadedUser);
      }
    }
  }

  autoLogout() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      if (new Date() > new Date(userData._tokenExpirationDate)) {
        this.onLogout();
      }
    }
  }
}
