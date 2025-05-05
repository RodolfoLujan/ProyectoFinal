import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent {
  name!: string;
  brandsService = inject(BrandService);
  router = inject(Router);
  route=inject(ActivatedRoute);
  id!:string;
  ngOnInit(){
    this.id=this.route.snapshot.params["id"];
    this.brandsService.getBrandById(this.id).subscribe(result =>{
      this.name=result.name;
    });
  }
  add(){
    this.brandsService.addBrand(this.name).subscribe((result) =>{
      alert("Marca agregada");
      this.router.navigateByUrl("/admin/marcas");
    });
  }
  update(){
    this.brandsService.updateBrand(this.id,this.name).subscribe((result) =>{
      alert("Marca actualizada");
      this.router.navigateByUrl("/admin/marcas");
    });
  }
}
