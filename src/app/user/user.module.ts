import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { UserRootComponent } from './user-root/user-root.component';
import { HeaderComponent } from './header/header.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FeaturedComponent } from './featured/featured.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { TestComponent } from './test/test.component';
import { ProdDetailComponent } from './prod-detail/prod-detail/prod-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserRootComponent,
    HeaderComponent,
    TopNavigationComponent,
    HomeSliderComponent,
    FooterComponent,
    ServicesComponent,
    FeaturedComponent,
    ProductsComponent,
    NewsletterComponent,
    ProdDetailComponent,
    RegisterComponent,
    LoginComponent,
    SidebarFilterComponent,
    TestComponent],
  imports: [
    BrowserModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class UserModule { }
