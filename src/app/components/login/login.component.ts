import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private cart = inject(CartService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe({
  next: (result: any) => {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));

    this.cart.updateCartCount(result.user._id); // ✅ recupera el contador

    this.router.navigateByUrl('/');
  },
  error: err => {
    console.error('[LOGIN] Error:', err);
    alert(`Error: ${err.error?.message || err.message || err}`);
  }
});
  }
}
