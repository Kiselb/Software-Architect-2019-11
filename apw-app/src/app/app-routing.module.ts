import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main/main.component'
import { LoginComponent } from './users/login/login.component';
import { AboutComponent } from './about/about/about.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { ClientsComponent } from './main/clients/clients/clients.component';
import { RequestsComponent } from './main/requests/requests/requests.component';
import { RequestsNewComponent } from './main/requests_new/requests-new/requests-new.component';
import { RequestsActiveComponent } from './main/requests_active/requests-active/requests-active.component';
import { RequestsArchiveComponent} from './main/requests_archive/requests-archive/requests-archive.component';
import { RequestsRegisterComponent } from './main/requests-register/requests-register.component';
import { ClientsRegisterComponent } from './main/clients-register/clients-register.component';
import { StorageComponent } from './main/storage/storage/storage.component';

import { AuthGuard } from './users/auth/auth.guard';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '',  component: MainComponent, canActivate: [AuthGuard]},
    { path: 'clients', children: [
      { path: '',  component: ClientsComponent, canActivate: [AuthGuard]},
      { path: 'register',  component: ClientsRegisterComponent, canActivate: [AuthGuard]},
    ]},
    { path: 'requests', children: [
      { path: '', component: RequestsComponent, canActivate: [AuthGuard]},
      { path: 'register', component: RequestsRegisterComponent, canActivate: [AuthGuard]},
      { path: 'new', component: RequestsNewComponent, canActivate: [AuthGuard]},
      { path: 'active', component: RequestsActiveComponent, canActivate: [AuthGuard]},
      { path: 'archive', component: RequestsArchiveComponent, canActivate: [AuthGuard]},
    ]},
    { path: 'storage',  component: StorageComponent, canActivate: [AuthGuard]},
    { path: '**', component: AboutComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
