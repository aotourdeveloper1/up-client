import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isModalVisible: boolean = false;

  // Event
  recibirCierreModal(event: boolean) {
    this.isModalVisible = event;
  }
}
