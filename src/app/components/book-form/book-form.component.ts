import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  loading = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      published_at: ['', Validators.required],
      isbn: ['', Validators.required],
      pages: [1, [Validators.required, Validators.min(1)]],
      language: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEditMode = true;
      this.loading = true;
      this.api.getBookById(this.bookId).subscribe({
        next: (res: any) => {
          const book = res.response;
          this.bookForm.patchValue(book);
          this.loading = false;
        },
        error: err => {
          this.snackBar.open('Failed to load book.', 'Close', { duration: 2500 });
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.snackBar.open('Please fix validation errors.', 'Close', { duration: 2500 });
      return;
    }
    this.loading = true;
    const data = this.bookForm.value;
    if (this.isEditMode && this.bookId) {
      this.api.updateBook(this.bookId, data).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.status_message || 'Book updated!', 'Close', { duration: 2500 });
          this.router.navigate(['/books']);
        },
        error: err => {
          this.snackBar.open('Book update failed.', 'Close', { duration: 2500 });
          this.loading = false;
        }
      });
    } else {
      this.api.addBook(data).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.status_message || 'Book added!', 'Close', { duration: 2500 });
          this.router.navigate(['/books']);
        },
        error: err => {
          this.snackBar.open('Book addition failed.', 'Close', { duration: 2500 });
          this.loading = false;
        }
      });
    }
  }

  onDelete() {
    if (this.isEditMode && this.bookId) {
      this.loading = true;
      this.api.deleteBook(this.bookId).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.status_message || 'Book deleted!', 'Close', { duration: 2500 });
          this.router.navigate(['/books']);
        },
        error: err => {
          this.snackBar.open('Book deletion failed.', 'Close', { duration: 2500 });
          this.loading = false;
        }
      });
    }
  }
}
