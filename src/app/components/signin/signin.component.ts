import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import router

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
})
export class SigninComponent {
  signinForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router // Inject it here
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSignin() {
    if (this.signinForm.invalid) {
      this.snackBar.open('Please fix the errors in the form', 'Close', { duration: 3000 });
      return;
    }
    this.loading = true;
    this.api.signin(this.signinForm.value).subscribe({
      next: (res: any) => {
        console.log
        if (res['status_code'] == "200") {
          this.snackBar.open(res.status_message || 'Signin Successful!', 'Close', { duration: 3000 });
          this.signinForm.reset();
          // Store the token if required
          localStorage.setItem('accessToken', res['response']);
          this.router.navigate(['/books']); // Navigate to Books page
        } else {
          this.snackBar.open('Signin Failed. Invalid credentials.', 'Close', { duration: 3000 });
        }
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Signin Failed. Try again!', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
