// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PRIMEN NG
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENTES
import { PortalsComponent } from './portals.component';

@NgModule({
  declarations: [
    PortalsComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    SharedModule
  ]
})
export class PortalsModule { }
