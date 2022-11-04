import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../user/user.model';

interface AuthResData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  lacalIn:string,
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user=new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) { }

  signup(email:string,password:string){
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtqFhkMjZo4hlP_CYBtQ4-8njYvg33n-E',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(tap(
      (resData)=>{
        const expirationDate=new Date(new Date().getTime()+ +resData.expiresIn*1000);
        const user=new User(resData.email,resData.lacalIn,resData.idToken,expirationDate);
        this.user.next(user);
      }
    ))
  }

  login(email:string,password:string){
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtqFhkMjZo4hlP_CYBtQ4-8njYvg33n-E',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(tap(
      (resData)=>{
        const expirationDate=new Date(new Date().getTime()+ +resData.expiresIn*1000);
        const user=new User(resData.email,resData.lacalIn,resData.idToken,expirationDate);
        this.user.next(user);
      }
    ))
  }
}
