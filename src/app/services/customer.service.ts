import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient);
  constructor() { }
  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl + "/customer/nuevos-productos");
  }
  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl + "/customer/productos-destacados");
  }
  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl + "/customer/categorias");
  }
}
