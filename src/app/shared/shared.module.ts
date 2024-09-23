// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

// COMPONENTES
import { FooterPageComponent } from './components/footer-page/footer-page.component';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';
import { ModalCreacionEjecutivoComponent } from './components/modal-creacion-ejecutivo/modal-creacion-ejecutivo.component';
import { HttpService } from './services/http.service';
import { HttpImplService } from './services/impl/http-impl.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NG-ZORRO
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

// Material
import { MatPaginatorModule } from '@angular/material/paginator';

// CDK
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';

const MODULOS = [
  NzInputModule,
  NzFormModule,
  NzDropDownModule,
  NzSelectModule,
  NzBreadCrumbModule,
  NzModalModule,
  NzTabsModule,
  NzTableModule,
  NzSelectModule,
  NzFormModule,
  NzSwitchModule,
  NzToolTipModule,
  NzDatePickerModule,
  NzButtonModule,
  NzSpinModule,
  NzCarouselModule,
  NzIconModule,
  NzDividerModule,
  NzCheckboxModule,
  NzCardModule,
  NzSliderModule,
  NzListModule,
  NzSkeletonModule,
  NzTimePickerModule,
  NzInputNumberModule,
  NzPopoverModule,
  NzUploadModule,
  NzPopconfirmModule,
  NzMessageModule,
  NzStepsModule,
  NzTimelineModule,
  NzNotificationModule,
  NzBadgeModule,
  // MATERIAL
  MatPaginatorModule,
  DragDropModule,
  // MODULOS
  HttpClientModule,
  // GOOGLE MAPS
  GoogleMapsModule,
  FormsModule
];

const COMPONENTES = [
  FooterPageComponent,
  NavbarPageComponent,
  ModalCreacionEjecutivoComponent,
  ModalComponent
];

@NgModule({
  declarations: [...COMPONENTES],
  imports: [CommonModule, RouterModule, ReactiveFormsModule,...MODULOS],
  exports: [...COMPONENTES],
  providers: [HttpService, HttpImplService],
})
export class SharedModule {}
