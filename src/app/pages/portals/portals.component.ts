import { Component } from '@angular/core';

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.scss']
})
export class PortalsComponent {
  headerTemplate: string = '';

  isModalVisible: boolean = false;

  // Event
  recibirCierreModal(event: boolean) {
    this.isModalVisible = event;
  }
}
