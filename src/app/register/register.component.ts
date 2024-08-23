import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
      ]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }



  // custom validator
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('Password')
    const confirmPassword = formGroup.get('ConfirmPassword')

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true }
    }
    return null
  }



  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value

      // saving to localstorage
      localStorage.setItem('RegData', JSON.stringify(formData))
      console.log('Form Data:', formData);

      this.signupForm.reset()
      alert('Registration Successful')

      this.router.navigate(['/login'])

    }
  }

}

