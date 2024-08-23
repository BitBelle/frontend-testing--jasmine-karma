import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/user';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  isLoggedIn: boolean = false
  currentUser!: User | null


  constructor(){}


  ngOnInit(): void{
    const currentUser = localStorage.getItem('currentUser')
    
    if (currentUser){
      this.currentUser = JSON.parse(currentUser)
      this.isLoggedIn = true //then user is logged in
    
    } else {
      this.currentUser = null
      this.isLoggedIn = false //user not logged in

    }
    
  }
}
