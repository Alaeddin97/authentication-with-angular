import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  isLogInMode: boolean = false;
  email: string;
  password: string;
  error: string = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.isLogInMode) {
      this.authService.signup(this.email, this.password).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.error = error.message;
        }
      );
    } else {
      this.authService.login(this.email, this.password).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.error = error.message;
        }
      );
    }
    console.log(this.form);

    this.form.reset();
  }

  onSwitch() {
    this.isLogInMode = !this.isLogInMode;
  }
}
