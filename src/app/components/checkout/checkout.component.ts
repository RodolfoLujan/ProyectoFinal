import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  router = inject(Router);

  items: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    const userId = this.authService.userId;
    if (!userId) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.cartService.getCart(userId).subscribe(cart => {
      this.items = cart.items;
      this.total = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    });
  }

  confirmOrder() {
    const userId = this.authService.userId;
    if (!userId || this.items.length === 0) return;

    const orderData = {
      userId,
      items: this.items,
      total: this.total,
    };

    this.orderService.createOrder(orderData).subscribe(() => {
      this.cartService.clearCart(userId).subscribe(() => {
        alert('Pedido confirmado');
        this.cartService.updateCartCount(); 
        this.router.navigateByUrl('/'); 
      });
    });
  }
}
