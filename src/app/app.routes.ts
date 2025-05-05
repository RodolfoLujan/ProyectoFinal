import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'admin/categorias',
        component: CategoriesComponent        
    },
    {
        path:'admin/categorias/add',
        component: CategoryFormComponent     
    },
    {
        path:'admin/categorias/:id',
        component: CategoryFormComponent     
    }, 
    {
        path:'admin/marcas',
        component: BrandsComponent        
    },
    {
        path:'admin/marcas/add',
        component: BrandFormComponent     
    },
    {
        path:'admin/marcas/:id',
        component: BrandFormComponent     
    },
    {
        path:'admin/productos',
        component: ProductsComponent        
    },
    {
        path:'admin/productos/add',
        component: ProductFormComponent     
    },
    {
        path:'admin/productos/:id',
        component: ProductFormComponent     
    }, 
];

