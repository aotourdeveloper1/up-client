// MDOULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENTES
import { DriveWithUsComponent } from './drive-with-us.component';

@NgModule({
  declarations: [
    DriveWithUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DriveWithUsModule { }
