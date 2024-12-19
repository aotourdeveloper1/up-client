import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onVideoEnd() {
    window.location.href = 'https://memuevoconup.com/home'; // Cambia '/next-page' por tu ruta deseada
  }
}
