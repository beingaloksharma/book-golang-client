import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiUrl = 'http://localhost:8080/api/v1';
  token = '';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  signin(data: any) {
    return this.http.post(`${this.apiUrl}/signin`, data);
  }

  getProfile(username: string) {
    return this.http.get(`${this.apiUrl}/user/profile/${username}`, this.getHeaders());
  }

  // Book operations (add, get, update, delete)
  addBook(book: any) {
    return this.http.post(`${this.apiUrl}/book`, book, this.getHeaders());
  }

  getBooks() {
    return this.http.get(`${this.apiUrl}/book/books`, this.getHeaders());
  }

  getBookById(id: string) {
    return this.http.get(`${this.apiUrl}/book/${id}`, this.getHeaders());
  }

  updateBook(id: string, updateData: any) {
    return this.http.put(`${this.apiUrl}/book/${id}`, updateData, this.getHeaders());
  }

  patchBook(id: string, patchData: any) {
    return this.http.patch(`${this.apiUrl}/book/${id}`, patchData, this.getHeaders());
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.apiUrl}/book/${id}`, this.getHeaders());
  }

  // Cart Operations
  addToCart(data: any) {
    return this.http.post(`${this.apiUrl}/cart`, data, this.getHeaders());
  }

  viewCart() {
    return this.http.get(`${this.apiUrl}/cart`, this.getHeaders());
  }

  // Order Operations
  placeOrder() {
    return this.http.post(`${this.apiUrl}/order`, {}, this.getHeaders());
  }

  getOrderById(orderId: string) {
    return this.http.get(`${this.apiUrl}/order/${orderId}`, this.getHeaders());
  }

  updateOrderStatus(orderId: string, statusData: any) {
    return this.http.put(`${this.apiUrl}/order/${orderId}/status`, statusData, this.getHeaders());
  }

  updatePaymentStatus(orderId: string, paymentData: any) {
    return this.http.put(`${this.apiUrl}/order/${orderId}/payment`, paymentData, this.getHeaders());
  }

  // GET: Fetch all orders
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order/orders`, this.getHeaders());
  }
}
