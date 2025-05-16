import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }
  http=inject(HttpClient);
    
  getAllProducts(){
      return this.http.get<Product[]>(environment.apiUrl + "/product");
    
    }
    getProductById(id: string){
      return this.http.get<Product>(environment.apiUrl + "/product/" + id);
    }

    addProduct(model: Product){
      return this.http.post(environment.apiUrl + "/product", model);
    }

    updateProduct(id: string, model: Product){
      return this.http.put(environment.apiUrl + "/product/" + id, model); 
    }

    deleteProduct(id: string){
      return this.http.delete(environment.apiUrl + "/product/" + id);
    }

    //Para aplicar filtros:
    getFilteredProducts(search?: string | null, categoryId?: string | null) {
  let query = '';
  if (search) query += `search=${search}`;
  if (categoryId) query += `${query ? '&' : ''}categoryId=${categoryId}`;
  return this.http.get<Product[]>(`${environment.apiUrl}/product?${query}`);
}

}
