import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/order`;

  // Crear un pedido
  createOrder(data: {
    userId: string;
    items: any[];
    total: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener pedidos por usuario
  getOrdersByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}
