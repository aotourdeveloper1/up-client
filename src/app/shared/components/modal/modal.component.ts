import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() img: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() timeLeft: number | null = null;
  @Input() acciones: boolean = false;
  @Input() isVisibleObservacion: boolean = false;
  @Input() isVisibleNombreLote: boolean = false;
  @Input() isVisibleAbono: boolean = false;
  @Input() textYes: string = 'Si';
  @Input() textNot: string = 'No';
  @Output() isVisibleModal: EventEmitter<any> = new EventEmitter<any>();
  messageObservacion: string = '';
  nombreLote: string = '';
  abono: number = 0;

  // true => si, false => no
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  // EVENT
  emmitir() {
    this.isVisibleModal.emit(false);
  }

  emmitirAccion(event: boolean) {
    if (!this.isVisibleObservacion && !this.isVisibleNombreLote && !this.abono) {
      this.accion.emit(event);
      return;
    }
    if (this.messageObservacion != '') {
      const json: any = {
        accion: event,
        message: this.messageObservacion,
      };
      this.accion.emit(json);
    }
    if (this.nombreLote != '') {
      const json: any = {
        accion: event,
        message: this.nombreLote,
      };
      this.accion.emit(json);
    }

    if (this.abono != 0) {
      const json: any = {
        accion: event,
        message: this.abono,
      };
      this.accion.emit(json);
    }

    if (!event) {
      this.isVisibleModal.emit(false);
    }
  }
}
