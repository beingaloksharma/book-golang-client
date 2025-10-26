// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }    from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule }   from '@angular/material/button';
import { MatCardModule }     from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule }     from '@angular/material/list';
import { MatTableModule }    from '@angular/material/table';

// Core app components  
import { SignupComponent } from '../components/signup/signup.component'; 
import { SigninComponent } from '../components/signin/signin.component'; 
import { ProfileComponent } from '../components/profile/profile.component'; 
import { BookListComponent } from '../components/book-list/book-list.component'; 
import { BookDetailComponent } from '../components/book-detail/book-detail.component'; 
import { BookFormComponent } from '../components/book-form/book-form.component'; 
import { CartComponent } from '../components/cart/cart.component'; 
import { OrderComponent } from '../components/order/order.component'; 

// Services
import { ApiService } from '../services/api.service'; 

// Routing
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'book-form', component: BookFormComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [],
})
export class AppModule { }
