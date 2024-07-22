import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-with-us',
  templateUrl: './drive-with-us.component.html',
  styleUrls: ['./drive-with-us.component.scss']
})
export class DriveWithUsComponent implements OnInit{
  windowWidth: number = 0;
  
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
