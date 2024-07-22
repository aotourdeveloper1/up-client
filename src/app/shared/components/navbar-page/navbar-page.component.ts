import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  styleUrls: ['./navbar-page.component.scss'],
})
export class NavbarPageComponent implements OnInit{
  @Input() logo: string;
  @Input() botonFondo: string;
  @Input() shadow: string;

  isVisibleNav: boolean = false;
  windowWidth: number = 0;

  constructor() {
    this.logo = '../../../../assets/images/headers/logo.png';
    this.botonFondo = '#db4403';
    this.shadow = '0px 17px 33px 0px #ffcbb5';
  }
  ngOnInit(): void {
    this.updateWindowWidth();
  }

    // Método que se ejecuta cuando el tamaño de la ventana cambia
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.updateWindowWidth();
    }
  
    // Método para actualizar el ancho de la ventana
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
      console.log('Ancho de la ventana:', this.windowWidth);
    }
}
