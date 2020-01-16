import { Component } from '@angular/core';
import { AuthService } from './users/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'apw-app';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  userLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
