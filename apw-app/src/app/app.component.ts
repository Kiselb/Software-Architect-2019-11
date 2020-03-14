import { Component } from '@angular/core';
import { AuthService } from './users/auth/auth.service';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NewsLetterService } from './services/news-letter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = "BHZR7gUHJwp6FcZG4gPmuB8zPk6YZmdGN74MBVLfCZCLDwzQoSPdb0gTbpJJ_KzzZ3Fq-CZU-1wOKMzlIHXUWHc";

  title = 'apw-app';

  constructor(
    private swPush: SwPush,
    private newsLetterService: NewsLetterService,
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

  userName() {
    return this.authService.getUserName();
  }

  //
  //https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac
  //
  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => { console.log(sub); this.newsLetterService.addPushSubscriber(sub).subscribe(result => console.log(result))})
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
  notifyPush() {
    this.newsLetterService.notifyPush("{}").subscribe(result => console.log(result));
  }

  notifyEMail() {
    this.newsLetterService.notifyEMail("{}").subscribe(result => console.log(result));
  }
}
