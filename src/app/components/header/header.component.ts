import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Category } from '../../types/category';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  customerService = inject(CustomerService);
  router = inject(Router);
  authService = inject(AuthService);
  categoryList: Category[] = [];

  ngOnInit() {
    this.customerService.getCategories().subscribe(result => {
      this.categoryList = result;
    });
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/productos?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.router.navigateByUrl('/productos?categoryId=' + id);
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goToProfile() {
    if (this.authService.isAdmin) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/perfil');
    }
  }

}
