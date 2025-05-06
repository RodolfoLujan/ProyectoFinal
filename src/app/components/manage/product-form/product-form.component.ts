import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription:  [null, [Validators.required, Validators.minLength(10)]],
    description:  [null, [Validators.required, Validators.minLength(50)]],
    price:  [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
  });
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands: Brand [] = [];
  categories: Category[] = [];
  id!:string;
  route = inject(ActivatedRoute);
  ngOnInit(){
    this.categoryService.getCategories().subscribe((result) =>{
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) =>{
      this.brands = result;
    });
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    if(this.id){
        this.productService.getProductById(this.id).subscribe(result =>{
          for(let index = 0; index < result.images.length; index++){
            this.addImage();
          }
          this.productForm.patchValue(result as any);
        });
    }else{
      this.addImage();
    }
  }
  router=inject(Router);
  
  addProduct(){
    let value=this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe((result) =>{
      alert("Producto añadido");
      this.router.navigateByUrl("/admin/productos");
    });
  }
  updateProduct(){
    let value=this.productForm.value;
    console.log(value);
    this.productService.updateProduct(this.id, value as any).subscribe((result) =>{
      alert("Producto actualizado");
      this.router.navigateByUrl("/admin/productos");
    });
  }
  addImage(){
    this.images.push(this.formBuilder.control(null));
  }
  removeImage(){
    this.images.removeAt(this.images.controls.length-1);
  }
  get images(){
    return this.productForm.get("images") as FormArray;
  }
}
