import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, LoginComponent],
  imports: [CommonModule, NgbModule, ReactiveFormsModule, RouterModule, NgBootstrapFormValidationModule, HttpClientModule],
  exports: [HomeComponent, NavbarComponent, LoginComponent]
})
export class CoreModule {}
