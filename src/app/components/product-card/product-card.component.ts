import { Component, Input} from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  auth = inject(AuthService);
cart = inject(CartService);
router = inject(Router);
  @Input() product!: Product;
  
  addToCart(event: Event) {
  event.stopPropagation();

  if (!this.auth.isLoggedIn) {
    this.router.navigateByUrl('/login');
    return;
  }

  if (this.product.stock === 0) {
    alert("Producto sin stock disponible");
    return;
  }

  this.cart.addToCart(this.auth.userId!, this.product._id!, this.product.price, 1).subscribe(() => {
    this.cart.updateCartCount(this.auth.userId!);
    alert(`"${this.product.name}" agregado al carrito.`);
  });
}

}
