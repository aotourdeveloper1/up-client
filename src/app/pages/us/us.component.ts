import { Component } from '@angular/core';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})
export class UsComponent {
  isModalVisible: boolean = false;

  // Event
  recibirCierreModal(event: boolean) {
    this.isModalVisible = event;
  }
}
