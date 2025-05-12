import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service'; // Debes tenerlo o simularlo
import { CartService } from '../../services/cart.service';

import { Product } from '../../types/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product | null = null;
  comments: any[] = [];
  message: string = '';
  rating: number = 5;
  quantity: number = 1;


  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  commentService = inject(CommentService);
  authService = inject(AuthService); // Simulado o real
  cartService = inject(CartService);
  private router = inject(Router);


  isLoggedIn = false;
  currentUser: string = '';

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    // Cargar detalles del producto
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res;
      if (res._id) {
    this.loadComments(res._id);
  }
    });

    // Verificar si el usuario está logueado
    this.isLoggedIn = this.authService.isLoggedIn;
this.currentUser = this.authService.userName;
  }

  getDiscountedPrice(price: number, discount: number): number {
    return discount ? Math.round(price * (1 - discount / 100)) : price;
  }

  loadComments(productId: string) {
    this.commentService.getComments(productId).subscribe((res: any) => {
      this.comments = res;
    });
  }

  submitComment() {
  if (!this.product || !this.product._id || !this.message || !this.rating) return;

  const commentData = {
    productId: this.product._id, // ahora es string garantizado
    userName: this.currentUser,
    message: this.message,
    rating: this.rating
  };

  this.commentService.postComment(commentData).subscribe(() => {
    this.message = '';
    this.rating = 5;
    this.loadComments(this.product!._id!); // ahora 100% seguro
  });
}

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(c => c._id !== commentId);
    });
  }

  addToCart() {
  if (!this.authService.isLoggedIn) {
    this.router.navigateByUrl('/login');
    return;
  }

  if (!this.product) return;

  if (this.quantity > this.product.stock) {
    alert("No hay suficiente stock disponible");
    return;
  }

  const userId = this.authService.userId;
  const productId = this.product._id!;
  const price = this.product.price;

  this.cartService.addToCart(userId, productId, price, this.quantity).subscribe(() => {
    this.cartService.updateCartCount(userId);
    alert('Producto agregado al carrito');
  });
}



}
