import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SidebarModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    StepsModule,
    TableModule,
    MultiSelectModule,
    ChartModule,
    ToastModule,
    PasswordModule
  ],
  exports: [
    SidebarModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    StepsModule,
    TableModule,
    MultiSelectModule,
    ChartModule,
    ToastModule,
    PasswordModule
  ]
})
export class PrimeModule { }
