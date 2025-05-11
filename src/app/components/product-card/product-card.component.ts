import { Component, Input} from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  addToCart(event: Event) {
    event.stopPropagation(); 
    console.log('Producto agregado al carrito:', this.product);
    alert(` "${this.product.name}" agregado al carrito.`);
  }
}
