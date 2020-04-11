import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';

import { PrimeModule } from './../../components/prime/prime.module';
import { SharesModule } from './../../components/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeModule,
    SharesModule,
    FormsModule
  ]
})
export class HomeModule { }
