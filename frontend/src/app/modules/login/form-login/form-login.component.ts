import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(10)]
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  email = '';
  password = '';

  async onLogin() {
    try {
      const result = await this.loginService.login(this.email, this.password);
    } catch(err: any) {
      alert('Erro ao fazer login. Verifique suas credênciais.');
    }
  }

}
