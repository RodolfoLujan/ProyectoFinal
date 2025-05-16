import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../services/customer.service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports:[CommonModule, ProductCardComponent, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
router = inject(Router);
categoryName: string | null = null;
customerService = inject(CustomerService);
  productList: Product[] = [];

  activeSearch: string | null = null;
activeCategory: string | null = null;

  ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    this.activeSearch = params.get('search');
    this.activeCategory = params.get('categoryId');

    if (this.activeCategory) {
      this.customerService.getCategories().subscribe(categories => {
        const category = categories.find(c => c._id === this.activeCategory);
        this.categoryName = category ? category.name : null;
      });
    } else {
      this.categoryName = null;
    }

    this.loadProducts(this.activeSearch, this.activeCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


  loadProducts(search: string | null, categoryId: string | null) {
  this.productService.getFilteredProducts(search, categoryId).subscribe(result => {
    this.productList = result;
  });
}


  clearFilters() {
  this.router.navigateByUrl('/productos'); 
}

}
