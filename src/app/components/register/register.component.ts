// register.component.ts
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,                            // <-- marca como standalone
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  private authService = inject(AuthService);
  router = inject(Router);

register() {
  let value = this.registerForm.value;
  this.authService.register(value.name!, value.email!, value.password!).subscribe((result) => {
      alert('User registered');
      this.router.navigateByUrl('/login');
    });
}

}
