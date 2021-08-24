import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/app-module/login/login.component";
import {RegisterComponent} from "./components/app-module/register/register.component";
import {ForgetPasswordComponent} from "./components/app-module/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./components/app-module/reset-password/reset-password.component";
import {ChangePasswordComponent} from "./components/app-module/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'reset-password/:reset_password_token',
    component: ResetPasswordComponent
  },
  {
    path: 'blogs',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
