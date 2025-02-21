import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormLoginComponent } from './form-login/form-login.component';



@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
