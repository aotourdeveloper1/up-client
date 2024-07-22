// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENTES
import { UsComponent } from './us.component';

@NgModule({
  declarations: [
    UsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsModule { }
