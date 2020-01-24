import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AuthorizationService } from '../auth/authorization.service';

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
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    ctrlName: this.ctrlName,
    ctrlPassword: this.ctrlPassword
  });

  tryLogin() {
    this.authService
      .login(this.ctrlName.value, this.ctrlPassword.value)
      .subscribe(
        response => {
          if (!(response instanceof HttpErrorResponse)) {
            this.authorizationService
              .authorize()
              .subscribe(
                response => {
                  if (!(response instanceof HttpErrorResponse)) {
                    this.router.navigateByUrl(this.authService.redirectUrl);
                  }
                },
                error => {
                  console.dir(error);
                }
              )
          }
        },
        error => {
          console.dir(error);
        }
      );
  }

  ngOnInit() {
  }
}
