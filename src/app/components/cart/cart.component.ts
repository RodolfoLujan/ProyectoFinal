import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../types/cart';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal', 'actions'];

  cartService = inject(CartService);
  authService = inject(AuthService);
  userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.authService.isLoggedIn ? this.authService.userId : null;
    this.loadCart();
  }

  loadCart() {
    if (this.authService.isLoggedIn && this.userId) {
      this.cartService.getCart(this.userId).subscribe(cart => {
        this.cartItems = cart.items;
        this.calculateTotal();
      });
    } else {
      const cart = JSON.parse(localStorage.getItem('guestCart') || '{"items": []}');
      this.cartItems = cart.items;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(productId: string) {
    this.cartService.removeItem(this.userId, productId).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cartItems = [];
      this.total = 0;
    });
  }

  getProductName(item: CartItem): string {
    if (typeof item.productId === 'string') return item.productId;
    return item.productId.name || 'Producto';
  }
}
