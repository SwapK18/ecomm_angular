import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRootComponent } from './user-root/user-root.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { ProdDetailComponent } from './prod-detail/prod-detail/prod-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserRootComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products/:catId',
        component: ProductsComponent
      },
      {
        path: 'prdDetail/:prdId',
        component: ProdDetailComponent
      },
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'user/registration',
        component: RegisterComponent
      }, {
        path: 'user/login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
