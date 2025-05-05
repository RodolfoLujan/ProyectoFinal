import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription:  [null, [Validators.required, Validators.minLength(10)]],
    description:  [null, [Validators.required, Validators.minLength(50)]],
    Price:  [null, [Validators.required]],
    discount: [],
    images: [],
    categoryId: [null, [Validators.required]],
  })
}
