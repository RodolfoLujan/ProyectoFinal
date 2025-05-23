import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  name!: string;
  categoryService=inject(CategoryService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  id!: string;
  ngOnInit(){
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit=true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any)=>{
        console.log(result);
        this.name=result.name;
      });
    }
  }

  add(){
    console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any) =>{
      alert("Categoria añadida");
      this.router.navigateByUrl("admin/categorias");
    })
  }
  update(){
    console.log(this.name);
    this.categoryService.updateCategory(this.id, this.name).subscribe((result: any) =>{
      alert("Categoria actualizada");
      this.router.navigateByUrl("admin/categorias");
    })
  }
}
