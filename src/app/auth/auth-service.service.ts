import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(private http:HttpClient) { }

  signup(email:string,password:string){
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtqFhkMjZo4hlP_CYBtQ4-8njYvg33n-E',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    )
  }

  login(email:string,password:string){
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtqFhkMjZo4hlP_CYBtQ4-8njYvg33n-E',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    )
  }
}
