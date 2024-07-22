// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTES
import { FooterPageComponent } from './components/footer-page/footer-page.component';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';

const COMPONENTES = [FooterPageComponent, NavbarPageComponent];

@NgModule({
  declarations: [...COMPONENTES],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTES]
})
export class SharedModule {}
