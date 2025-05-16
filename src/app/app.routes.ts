import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGaurd } from './core/auth-guard';
import { AdminDashbaordComponent } from './components/manage/admin-dashbaord/admin-dashbaord.component';
import { adminGaurd } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[authGaurd]
    },
    {
        path:'admin',
        component: AdminDashbaordComponent,
        canActivate:[adminGaurd]
    },
    {
        path:'admin/categorias',
        component: CategoriesComponent,  
        canActivate:[adminGaurd]     
    },
    {
        path:'admin/categorias/add',
        component: CategoryFormComponent,
        canActivate:[adminGaurd]     
    },
    {
        path:'admin/categorias/:id',
        component: CategoryFormComponent,
        canActivate:[adminGaurd]     
    }, 
    {
        path:'admin/marcas',
        component: BrandsComponent, 
        canActivate:[adminGaurd]        
    },
    {
        path:'admin/marcas/add',
        component: BrandFormComponent,
        canActivate:[adminGaurd]     
    },
    {
        path:'admin/marcas/:id',
        component: BrandFormComponent, 
        canActivate:[adminGaurd]     
    },
    {
        path:'admin/productos',
        component: ProductsComponent,
        canActivate:[adminGaurd]
    },
    {
        path:'admin/productos/add',
        component: ProductFormComponent,
        canActivate:[adminGaurd]     
    },
    {
        path:'admin/productos/:id',
        component: ProductFormComponent,
        canActivate:[adminGaurd]
    }, 
    {
        path:'productos',
        component: ProductListComponent,
        canActivate:[authGaurd]    
    }, 
    {
        path:'perfil',
        component: CustomerProfileComponent,
        canActivate:[authGaurd]    
    }, 
    {
        path:'producto/:id',
        component: ProductDetailComponent,
        canActivate:[authGaurd]     
    },
    {
        path:'register',
        component: RegisterComponent     
    }, 
    {
        path:'login',
        component: LoginComponent    
    },
    {
  path: 'carrito',
  component: CartComponent,
  canActivate: [authGaurd]
},
{
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGaurd] // opcional si quieres protegerlo
  }
];

