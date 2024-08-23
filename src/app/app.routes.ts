import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent },
    {path: '', redirectTo:'/register', pathMatch:'full'} //redirecting to login if no route is matched
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
