import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup
  

  constructor(private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    })
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { Email, Password } = this.loginForm.value;
  
      // Retrieve stored users from local storage and parse it
      const storedData = localStorage.getItem('RegData');
      const storedUsers = storedData ? JSON.parse(storedData) : [];
  
      // Ensure storedUsers is an array
      const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];
  
      // Check if user exists and the password matches
      const user = usersArray.find((user: any) => user.Email === Email && user.Password === Password);
  
      if (user) {
        // Store the current logged-in user
        localStorage.setItem('currentUser', JSON.stringify(user));
  
        // Clear the form and redirect
        this.loginForm.reset();
        alert('Login Successful');
  
        // Redirect to the dashboard or home page
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid email or password. Please try again.');
      }
    }
  }
  
}
