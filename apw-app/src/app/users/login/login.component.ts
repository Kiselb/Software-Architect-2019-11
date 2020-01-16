import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ctrlName: FormControl = new FormControl('', Validators.required);
  public ctrlPassword: FormControl = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    ctrlName: this.ctrlName,
    ctrlPassword: this.ctrlPassword
  });

  tryLogin() {
    this.authService
      .login(this.ctrlName.value, this.ctrlPassword.value)
      .subscribe(response => {
        if (!(response instanceof HttpErrorResponse)) {
          this.router.navigateByUrl(this.authService.redirectUrl);
        }
      });
  }

  ngOnInit() {
  }
}
