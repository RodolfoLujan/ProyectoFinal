import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  productList: Product[] = [];

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('search');
      const categoryId = params.get('categoryId');
      this.loadProducts(search, categoryId);
    });
  }

  loadProducts(search: string | null, categoryId: string | null) {
    this.productService.getFilteredProducts(search, categoryId).subscribe(result => {
      this.productList = result;
    });
  }
}
