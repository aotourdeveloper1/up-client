import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.scss']
})
export class FooterPageComponent {
  @Input() isVisibleBanner: boolean;
  @Input() height: number;
  windowWidth: number = 0;


  constructor() {
    this.isVisibleBanner = false;
    this.height = 490;
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
