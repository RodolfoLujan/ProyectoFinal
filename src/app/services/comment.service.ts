import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(productId: string) {
    return this.http.get(`${environment.apiUrl}/comment/${productId}`);
  }

  postComment(data: {
    productId: string;
    userName: string;
    message: string;
    rating: number;
  }) {
    return this.http.post(`${environment.apiUrl}/comment`, data);
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${environment.apiUrl}/comment/${commentId}`);
  }
}
