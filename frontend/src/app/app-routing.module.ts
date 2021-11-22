import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component'; 
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { AboutComponent } from './about/about.component';

import { ExpenseGuard } from './expense.guard';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'expenses', component: ExpenseEntryListComponent,canActivate: [ExpenseGuard] }, 
  { path: 'expenses/detail/:id', component: ExpenseEntryComponent,canActivate: [ExpenseGuard] },
  { path: 'expenses/add', component: AddEntryComponent, canActivate: [ExpenseGuard]},
  { path: 'expenses/edit/:id', component: EditEntryComponent, canActivate: [ExpenseGuard]},
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
]; 

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)
  //  CommonModule
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
