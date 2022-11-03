import { HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthInterceptorService{
   intercept(req:HttpRequest<any>,next:HttpHandler){

    console.log("Request is in its way !");
    
    const modifiedReq=req.clone({headers:req.headers.append('auth','xyz')})
    return next.handle(modifiedReq);
   }
}