// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
// PRIMEN NG
import { AccordionModule } from 'primeng/accordion';

// COMPONENTES
import { PoliciesComponent } from './policies.component';

@NgModule({
  declarations: [
    PoliciesComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    SharedModule
  ]
})
export class PoliciesModule { }
