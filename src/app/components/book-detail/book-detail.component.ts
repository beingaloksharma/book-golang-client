import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ]
})
export class BookDetailComponent implements OnInit {
  book: any = null;
  bookId: string | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    public  router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loading = true;
      this.api.getBookById(this.bookId).subscribe({
        next: (res: any) => {
          this.book = res.response;
          this.loading = false;
        },
        error: err => {
          this.snackBar.open('Failed to fetch book details.', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  addToCart() {
    if (this.book && this.book.id) {
      this.api.addToCart({ book_id: this.book.id }).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.success_message || 'Book added to cart!', 'Close', { duration: 2500 });
        },
        error: err => {
          this.snackBar.open('Failed to add book to cart.', 'Close', { duration: 2500 });
        }
      });
    }
  }

  editBook() {
    if (this.book && this.book.id) {
      this.router.navigate(['/book-form', this.book.id]);
    }
  }
}
