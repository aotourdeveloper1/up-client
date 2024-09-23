import { Component } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent {
  headerTemplate: string = '';

  isModalVisible: boolean = false;

  // Event
  recibirCierreModal(event: boolean) {
    this.isModalVisible = event;
  }
}
