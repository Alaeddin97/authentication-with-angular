import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';
import { AuthService } from './auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.autoLogout();
    this.authService.autoLogin();
    this.authService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['home']);
        console.log('STILL LOGGED IN');
      } else {
        this.router.navigate(['auth']);
        console.log('MUST LOGGED IN');
      }
    });
  }
}
