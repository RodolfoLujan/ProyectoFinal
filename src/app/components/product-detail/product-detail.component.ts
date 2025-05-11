import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  product: Product | null = null;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res;
    });
  }

  getDiscountedPrice(price: number, discount: number): number {
    return discount ? Math.round(price * (1 - discount / 100)) : price;
  }
}
