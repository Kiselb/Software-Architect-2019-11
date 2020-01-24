import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { MainComponent } from './main/main/main.component';
import { AboutComponent } from './about/about/about.component';
import { ClientsComponent } from './main/clients/clients/clients.component';
import { RequestsComponent } from './main/requests/requests/requests.component';
import { StorageComponent } from './main/storage/storage/storage.component';
import { RequestsNewComponent } from './main/requests_new/requests-new/requests-new.component';
import { RequestsActiveComponent } from './main/requests_active/requests-active/requests-active.component';
import { RequestsArchiveComponent } from './main/requests_archive/requests-archive/requests-archive.component';
import { RequestsRegisterComponent } from './main/requests-register/requests-register.component';
import { ClientsRegisterComponent } from './main/clients-register/clients-register.component';
import { JWTInterceptorService } from './users/auth/jwtinterceptor.service';
import { UsersComponent } from './users/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MainComponent,
    AboutComponent,
    ClientsComponent,
    RequestsComponent,
    StorageComponent,
    RequestsNewComponent,
    RequestsActiveComponent,
    RequestsArchiveComponent,
    RequestsRegisterComponent,
    ClientsRegisterComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
