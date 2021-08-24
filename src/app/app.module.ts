import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/app-module/header/header.component';
import {SharedModule} from "./modules/shared/shared.module";
import { LoginComponent } from './components/app-module/login/login.component';
import { RegisterComponent } from './components/app-module/register/register.component';
import { ForgetPasswordComponent } from './components/app-module/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/app-module/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/app-module/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
