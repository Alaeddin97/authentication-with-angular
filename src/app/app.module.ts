import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ShortenPipe } from './shorten.pipe';
const appRoute:Routes=[
{path:'home',component:HomeComponent},
{path:'auth',component:AuthComponent}
]

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, ShortenPipe],
  imports: [BrowserModule, FormsModule, HttpClientModule,RouterModule.forRoot(appRoute)],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
