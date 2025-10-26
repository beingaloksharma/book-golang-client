import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CommonModule,
    HttpClientModule,
  ]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = true;
    // Fetch order list (implement getOrders() in ApiService as needed)
    this.api.getOrders().subscribe({
      next: (res: any) => {
        // Adjust this according to your backend structure
        this.orders = res.response || [];
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Failed to fetch orders.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  payOrder(orderId: string) {
    // Example: basic payment update
    this.api.updatePaymentStatus(orderId, {
      method: 'UPI',
      paid: true,
      paid_on: new Date().toISOString(),
      reference: 'REF'+orderId
    }).subscribe({
      next: (res: any) => {
        this.snackBar.open('Payment updated. Refreshing orders...', 'Close', { duration: 2500 });
        this.ngOnInit(); // refresh
      },
      error: err => {
        this.snackBar.open('Payment update failed.', 'Close', { duration: 3000 });
      }
    });
  }
}
