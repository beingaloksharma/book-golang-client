import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total_items = 0;
  total_price = 0;
  loading = false;
  displayedColumns: string[] = ['book_id', 'quantity', 'price'];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.loading = true;
    this.api.viewCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.cart || [];
        this.total_items = res.total_items || 0;
        this.total_price = res.total_price || 0;
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Failed to fetch cart.', 'Close', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  placeOrder() {
    this.loading = true;
    this.api.placeOrder().subscribe({
      next: (res: any) => {
        this.snackBar.open(res.status_message || 'Order placed successfully!', 'Close', { duration: 3000 });
        this.fetchCart(); // Optionally clear or refresh cart after order
      },
      error: err => {
        this.snackBar.open('Order failed.', 'Close', { duration: 2500 });
        this.loading = false;
      }
    });
  }
}
