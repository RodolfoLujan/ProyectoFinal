import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Cart, CartItem } from '../types/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/cart`;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // 🔁 Pública
  updateCartCount(userId?: string) {
  if (this.auth.isLoggedIn) {
    this.getCart(userId || this.auth.userId!).subscribe(cart => {
      const count = cart?.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0;
      this.cartCountSubject.next(count);
    });
  } else {
    const cart = this.getGuestCart();
    const count = cart?.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0;
    this.cartCountSubject.next(count);
  }
}


  // 📦 Obtener carrito
  getCart(userId: string): Observable<Cart> {
  return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  // ➕ Agregar producto
  addToCart(userId: string | null, productId: string, price: number, quantity = 1): Observable<Cart> {
    if (this.auth.isLoggedIn && userId) {
      return this.http.post<Cart>(this.apiUrl, { userId, productId, price, quantity });
    } else {
      // Modo anónimo
      let cart = this.getGuestCart();
      const index = cart.items.findIndex((item: any) => item.productId === productId);
      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, price, quantity });
      }
      this.setGuestCart(cart);
      this.updateCartCount();
      return of(cart); // simula observable
    }
  }

  // 🗑 Eliminar item
  removeItem(userId: string | null, productId: string): Observable<Cart> {
    if (this.auth.isLoggedIn && userId) {
      return this.http.delete<Cart>(`${this.apiUrl}/${userId}/${productId}`);
    } else {
      let cart = this.getGuestCart();
      cart.items = cart.items.filter((item: any) => item.productId !== productId);
      this.setGuestCart(cart);
      this.updateCartCount();
      return of(cart);
    }
  }

  // 🧹 Vaciar carrito
  clearCart(userId: string | null): Observable<Cart> {
  if (this.auth.isLoggedIn && userId) {
    return this.http.delete<Cart>(`${this.apiUrl}/${userId}`);
  } else {
    localStorage.removeItem('guestCart');
    this.updateCartCount();
    return of({ userId: '', items: [] }); // ✅ cumple con tipo Cart
  }
}

migrateGuestCartToUser(userId: string): Observable<void> {
  const guestCart = this.getGuestCart();

  if (!guestCart.items || guestCart.items.length === 0) {
    return of();
  }

  const requests = guestCart.items.map(item => {
    const productId = typeof item.productId === 'string' ? item.productId : item.productId._id;
    return this.addToCart(userId, productId, item.price, item.quantity);
  });

  return new Observable(observer => {
    Promise.all(requests.map(req => req.toPromise()))
      .then(() => {
        localStorage.removeItem('guestCart');
        observer.next();
        observer.complete();
      })
      .catch(err => {
        console.error("Error migrando carrito:", err);
        observer.error(err);
      });
  });
}

  // 📥 Utilidades internas para guestCart
  private getGuestCart(): Cart {
  return JSON.parse(localStorage.getItem('guestCart') || '{"items": []}');
}

private setGuestCart(cart: Cart) {
  localStorage.setItem('guestCart', JSON.stringify(cart));
}


}
