import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  loading = false;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = true;
    // Replace 'admin' with dynamic username as needed
    this.api.getProfile('admin').subscribe({
      next: (res: any) => {
        this.user = res.response;
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Failed to fetch profile.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
