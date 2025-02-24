import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email,password } = this.loginForm.value;
      console.log('Dados enviados:', { email, password });

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
    this.loginForm.markAllAsTouched();
  }

}
