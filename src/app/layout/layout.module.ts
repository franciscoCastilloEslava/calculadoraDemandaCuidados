import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout.component';

import { PrimeModule } from './../components/prime/prime.module';
import { SharesModule } from './../components/shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeModule,
    SharesModule
  ]
})
export class LayoutModule { }
