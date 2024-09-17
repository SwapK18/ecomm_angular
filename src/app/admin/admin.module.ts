import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { AdminUserComponent } from './admin-user/admin-user.component';


@NgModule({
  declarations: [
    AdminUserComponent,
    AdminRootComponent,
    AdminUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
