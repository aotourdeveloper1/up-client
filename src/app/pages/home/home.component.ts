import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  windowWidth: number = 0;
  isModalVisible: boolean = false;

  ngOnInit(): void {
    this.updateWindowWidth();
  }

  // Event
  recibirCierreModal(event: boolean) {
    this.isModalVisible = event;
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
