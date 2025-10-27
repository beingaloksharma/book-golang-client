import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCard,
    MatCardTitle,
    MatProgressBar,
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.snackBar.open('Please fix the errors in the form', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.loading = true;
    this.api.signup(this.signupForm.value).subscribe({
      next: (res: any) => {
        this.snackBar.open(
          res.status_message || 'Signup Successful!',
          'Close',
          { duration: 3000 }
        );
        this.signupForm.reset();
        this.loading = false;
      },
      error: (err) => {
        const msg = err?.error?.status_message || 'Signup Failed. Try again!';
        this.snackBar.open(msg, 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }
}
