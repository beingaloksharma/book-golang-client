import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ]
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.api.getBooks().subscribe({
      next: (res: any) => {
        this.books = res.response || [];
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Failed to fetch books.', 'Close', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  addToCart(bookId: string) {
    this.api.addToCart({ book_id: bookId }).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.success_message || 'Book added to cart!', 'Close', { duration: 2500 });
      },
      error: err => {
        this.snackBar.open('Failed to add book to cart.', 'Close', { duration: 2500 });
      }
    });
  }

  viewDetails(bookId: string) {
    this.router.navigate(['/books', bookId]);
  }
}
