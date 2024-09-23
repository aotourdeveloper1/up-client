import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ITag } from 'src/app/shared/models/tag.interface';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-modal-creacion-ejecutivo',
  templateUrl: './modal-creacion-ejecutivo.component.html',
  styleUrls: ['./modal-creacion-ejecutivo.component.scss'],
})
export class ModalCreacionEjecutivoComponent {
  // LA USAMOS PARA EMITTIR EL ESTADO DE CERRAR EL MODAL DE CREACIÓN DE SERVICIOS EJECUTIVOS
  @Input() itemSeleccionado: any;
  @Output() abrirModalAgregar: EventEmitter<boolean> = new EventEmitter(false);

  // MAPA
  // COGEMOS EL ELEMENTO QUE MUESTRA EL MAPA EN EL TABS 3
  @ViewChild('mapaElemento', { static: false }) mapaElemento!: ElementRef;

  // ALMACENAMOS TODAS LAS PARADAS DEL SERVICIO
  destinosList: any[] = [
    {
      id: 1,
      direccion: '',
      latitud: 0,
      longitud: -0,
    },
    {
      id: 2,
      direccion: '',
      latitud: 0,
      longitud: -0,
    },
  ];

  // TABS
  // ALMACENAMOS EN QUE TAB ESTA UBICADO EL USUARIO
  tagActivo: number = 1;
  // LISTADO DE TODOS LOS TABS
  tag: ITag[] = [
    {
      id: 1,
      codigo: 'SER_SER',
      nombreTag: 'Programación de viajes',
      iconTag: '../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 2,
      codigo: 'DAT_PAS',
      nombreTag: 'Datos del los pasajeros',
      iconTag: '../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 3,
      codigo: 'DES',
      nombreTag: 'Destinos',
      iconTag: '../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 4,
      codigo: 'TRA',
      nombreTag: 'Traslados',
      iconTag: '../../../../assets/icons/tags/suspensivo.svg',
    },
  ];

  file!: File;

  // LISTADO DE CLIENTES
  listCentrosCostosBase: any[] = [];
  listCentrosCostos: any[] = [];

  // ALMACENAMOS LAS ORDENES DE SERVICIO YA PROGRAMADAS
  listOrdenServicio: any[] = [];

  // LISTADOS DE TODOS LOS SELECT DEL FORMULARIO
  listCiudades: any[] = [];

  // LISTADO DE ENTIDADES
  entidadList: any[] = [];

  // ALMACENAMOS LOS PASAJEROS QUE VAN A USAR EL SERVICIO QUE SE ESTA CREANDO
  pasajeros: any[] = [];
  listIndicativos: any[] = this._utilService.getContryHas();
  editPasajeroItem: any;
  enviando: boolean = false;

  // PAGINADOR
  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  /** Visibilidad del modal de resultados. */
  isVisibleModal: boolean = false;
  /** Imagen del modal de resultados. */
  imgModal: string = '.../../../../../../assets/images/modal/satisfactorio.png';
  /** Título del modal de resultados. */
  titleModal: string = '¡Viaje exitoso!';
  /** Mensaje del modal de resultados. */
  messageModal: string =
    'La solicitud de los viajes se ha realizado correctamente en el apartado de viajes no programados los puede visualizar';
  /** Acciones del modal de resultados. */
  acciones: boolean = false;

  // FORM
  formServicios: FormGroup;
  clienteSeleccionado: number = 0;

  entidadSeleccionada: number = 0;

  consultConfiguracion: any[] = [];

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private _utilService: UtilsService,
    private message: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.formServicios = this.formBuilder.group({
      fk_cliente: ['', [Validators.required]],
      fk_ciudad: ['', [Validators.required]],
      nombre: [''],
      indicativo: [57],
      celular: [''],
      correo: [''],
      campo1: [''],
      campo2: [''],
      campo3: [''],
      campo4: [''],
      campo5: [''],
      sede: ['', [Validators.required]],
      centrodecosto: [''], //sólo si es aviatur
      vuelo: [''],
      detalles: ['', [Validators.required]],
      fecha_viaje: [new Date(), [Validators.required]],
      hora_viaje: [new Date(), [Validators.required]],
      desde: ['', [Validators.required]],
      hasta: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this._httpService.apiUrl = environment.url;
    await this.getCentroCosto();
    await this.getCiudades();
    await this.getLocalidades();
  }

  enabledCampo() {
    if (this.consultConfiguracion[0].exped == '0') {
      this.formServicios.get('centrodecosto')?.clearValidators();
      this.formServicios.get('centrodecosto')?.updateValueAndValidity();
    }
    if (!this.consultConfiguracion[0].campo1) {
      this.formServicios.get('campo1')?.clearValidators();
      this.formServicios.get('campo1')?.updateValueAndValidity();
    }
    if (!this.consultConfiguracion[0].campo2) {
      this.formServicios.get('campo2')?.clearValidators();
      this.formServicios.get('campo2')?.updateValueAndValidity();
    }
    if (!this.consultConfiguracion[0].campo3) {
      this.formServicios.get('campo3')?.clearValidators();
      this.formServicios.get('campo3')?.updateValueAndValidity();
    }
    if (!this.consultConfiguracion[0].campo4) {
      this.formServicios.get('campo4')?.clearValidators();
      this.formServicios.get('campo4')?.updateValueAndValidity();
    }
    if (!this.consultConfiguracion[0].campo5) {
      this.formServicios.get('campo5')?.clearValidators();
      this.formServicios.get('campo5')?.updateValueAndValidity();
    }
  }

  disabledCampo() {
    if (this.consultConfiguracion[0].exped != '0') {
      this.formServicios
        .get('centrodecosto')
        ?.addValidators(Validators.required);
      this.formServicios.get('centrodecosto')?.updateValueAndValidity();
    }
    if (this.consultConfiguracion[0].campo1) {
      this.formServicios.get('campo1')?.addValidators(Validators.required);
      this.formServicios.get('campo1')?.updateValueAndValidity();
    }
    if (this.consultConfiguracion[0].campo2) {
      this.formServicios.get('campo2')?.addValidators(Validators.required);
      this.formServicios.get('campo2')?.updateValueAndValidity();
    }
    if (this.consultConfiguracion[0].campo3) {
      this.formServicios.get('campo3')?.addValidators(Validators.required);
      this.formServicios.get('campo3')?.updateValueAndValidity();
    }
    if (this.consultConfiguracion[0].campo4) {
      this.formServicios.get('campo4')?.addValidators(Validators.required);
      this.formServicios.get('campo4')?.updateValueAndValidity();
    }
    if (this.consultConfiguracion[0].campo5) {
      this.formServicios.get('campo5')?.addValidators(Validators.required);
      this.formServicios.get('campo5')?.updateValueAndValidity();
    }
  }

  searchClient(searchValue: string): void {
    this.listCentrosCostosMet(searchValue);
  }

  listCentrosCostosMet(searchValue?: string) {
    if (searchValue) {
      const regex = new RegExp(
        searchValue.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'i'
      );
      this.listCentrosCostos = this.listCentrosCostosBase.filter((item) =>
        regex.test(item.razonsocial)
      );
      return;
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
    }
    this.file = event.target.files[0];

    new Promise(async (resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          raw: false,
        });
        const header = jsonData[0]; // Obtener la primera fila como encabezado

        const result: any[] = [];
        for (let i = 1; i < jsonData.length; i++) {
          // Iterar a través de las filas de datos (omitir la primera fila que es el encabezado)
          const row = jsonData[i];
          const obj: any = {};

          for (let j = 0; j < header.length; j++) {
            // Iterar a través de las columnas y asignar los valores a las propiedades del objeto
            const key = header[j];
            const value = row[j];
            obj[key] = value;
          }
          result.push(obj); // Agregar el objeto al resultado final
        }
        result.map(async (value: any, index: number) => {
          // const pasajeros:
          this.listOrdenServicio.push({
            fk_ciudad: this.listCiudades.find(
              (x: any) => x.nombre == value['CIUDAD']
            ).id,
            ciudadName: value['CIUDAD'],
            fecha: value['FECHA'],
            hora: value['HORA'],
            detalles: value['REQUERIMIENTOS DEL TRASLADO'],
            desde: value['RECOGIDA'] || null,
            hasta: value['DESTINO'] || null,
            vuelo: value['VUELO'] || null, // "AV9922", //opcional
            centrodecosto: value['# Expediente'] || null, // "1265", //opcional
            campo1: value['CAMPO1'] || null,
            campo2: value['CAMPO2'] || null,
            pasajeros: String(value['PASAJEROS (Separar con , )'])
              .split(',')
              .map((element: string, i: number) => {
                return {
                  nombre:
                    String(value['PASAJEROS (Separar con , )']).split(',')[i] ||
                    null,
                  celular:
                    String(value['CELULAR (Separar con ; )']).split(',')[i] ||
                    null,
                  correo:
                    String(value['CORREO (Separar con , )']).split(',')[i] ||
                    null,
                };
              }),
          });
        });
        this.tagSeleccionadoMet({ id: 4 });
        this.message.success('Subidas correctamente');
        resolve(result);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsArrayBuffer(this.file!);
    });
  }

  addPasajeros() {
    if (this.formServicios.get('nombre')?.value) {
      this.pasajeros.push({
        id:
          this.pasajeros.length == 0
            ? 1
            : this.pasajeros[this.pasajeros.length - 1].id + 1,
        nombre: this.formServicios.get('nombre')?.value,
        indicativo: this.formServicios.get('indicativo')?.value,
        celular: this.formServicios.get('celular')?.value,
        correo: this.formServicios.get('correo')?.value,
      });

      this.limpiarPasajeros();
      this.editPasajeroItem = null;
    }
  }

  limpiarPasajeros() {
    this.formServicios.get('nombre')?.setValue('');
    this.formServicios.get('indicativo')?.setValue(57);
    this.formServicios.get('celular')?.setValue('');
    this.formServicios.get('correo')?.setValue('');

    this.editPasajeroItem = null;
  }

  editPasajero(item: any) {
    this.formServicios.get('nombre')?.setValue(item.nombre);
    this.formServicios.get('indicativo')?.setValue(item.indicativo);
    this.formServicios.get('celular')?.setValue(item.celular);
    this.formServicios.get('correo')?.setValue(item.correo);

    this.editPasajeroItem = item;
  }

  getPasajeroTooltip(pasajeoros: any[]): string {
    if (!pasajeoros || pasajeoros.length === 0) {
      return 'No hay pasajeros disponibles';
    }
    return pasajeoros.map((item) => item.nombre).join(' // ');
  }

  insertTraslados() {
    if (
      this.destinosList[0].direccion == '' ||
      this.destinosList[1].direccion == ''
    ) {
      this.message.info(
        'Tiene paradas sin configurar, por favor asigne las direcciones de las paradas para adcionar más'
      );
      return;
    }

    this.formServicios.get('desde')?.setValue(this.destinosList[0].direccion);
    this.formServicios.get('hasta')?.setValue(this.destinosList[1].direccion);

    console.log(this.formServicios.value);
    if (this.formServicios.invalid) {
      this.message.info(
        'No es posible acceder a esta sección, debe llenar todos los campos de programación de viaje '
      );
      return;
    }

    if (this.pasajeros.length == 0) {
      this.message.info(
        'No es posible acceder a la sesión de destinos sino cuenta con pasajeros'
      );
      return;
    }

    const json = {
      ciudadName: this.listCiudades.find(
        (value: any) => value.id == this.formServicios.get('fk_ciudad')?.value
      ).nombre,
      ...this.formServicios.value,
      fecha: this._utilService.formatDate(
        this.formServicios.get('fecha_viaje')?.value
      ),
      hora: this._utilService.formatTimeToNZFormat(
        this.formServicios.get('hora_viaje')?.value
      ),
      pasajeros: this.pasajeros.map((value) => value),
    };
    this.listOrdenServicio.push(json);

    this.tagSeleccionadoMet({ id: 4 });

    this.clienteSeleccionado = this.formServicios.get('fk_cliente')?.value;
    this.entidadSeleccionada = this.formServicios.get('sede')?.value;

    this.formServicios.reset();
    this.pasajeros.length = 0;

    this.formServicios.get('sede')?.setValue(this.entidadSeleccionada);
    this.formServicios.get('fk_cliente')?.setValue(this.clienteSeleccionado);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.destinosList, event.previousIndex, event.currentIndex);

    if (
      this.destinosList[0].direccion &&
      this.destinosList[this.destinosList.length - 1].direccion
    ) {
      this.initMap();
    }
  }

  initMapUntilDefined(): void {
    if (!this.mapaElemento) {
      // Si mapaElement es undefined, esperamos un momento y llamamos nuevamente a la función
      setTimeout(() => this.initMapUntilDefined(), 100);
    } else {
      // Lógica para inicializar el mapa utilizando mapaElement
      this.initMap();
    }
  }

  initMap(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(this.mapaElemento.nativeElement, {
      disableDefaultUI: true,
      zoom: 10,
      center: { lat: 10.9684279, lng: -74.7744147 },
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text',
          stylers: [
            {
              color: '#878787',
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {
              color: '#f9f5ed',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            {
              color: '#f5f5f5',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#c9c9c9',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              color: '#aee0f4',
            },
          ],
        },
      ],
    });

    directionsRenderer.setMap(map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const waypts: google.maps.DirectionsWaypoint[] = [];

    for (let i = 0; i < this.destinosList.length - 1; i++) {
      if (i == 0) {
        continue;
      }
      waypts.push({
        location: this.destinosList[i].direccion,
        stopover: true,
      });
    }

    directionsService
      .route({
        origin: this.destinosList[0].direccion,
        destination: this.destinosList[this.destinosList.length - 1].direccion,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  }

  placeInput() {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631)
    );

    const inputs = document.getElementsByClassName('input__location');

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement; // Convertimos el elemento a HTMLInputElement

      const autocomplete = new google.maps.places.Autocomplete(input, {
        bounds: defaultBounds, // Asegúrate de definir defaultBounds según tu aplicación
        componentRestrictions: { country: 'CO' }, // Código de país ISO 3166-1 alfa-2 para Colombia
      });

      autocomplete.addListener('place_changed', (value: any) => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        // Aquí puedes acceder a los datos del lugar seleccionado, como la dirección, latitud y longitud
        const direccion = place.formatted_address;
        const latitud = place.geometry.location.lat();
        const longitud = place.geometry.location.lng();

        this.destinosList = this.destinosList.map((value, index) => {
          if (index == i) {
            return {
              ...value,
              direccion: direccion,
              latitud: latitud,
              longitud: longitud,
            };
          } else {
            return {
              ...value,
            };
          }
        });

        if (
          this.destinosList[0].direccion &&
          this.destinosList[this.destinosList.length - 1].direccion
        ) {
          this.initMap();
        }
        // Borramos el contenido del campo de entrada
        // input.value = ''; // Esto borra el contenido del campo de entrada
      });
    }
  }

  cancel(): void {}

  confirm(pasajero: number): void {
    this.pasajeros = this.pasajeros.filter((value) => value.id != pasajero);

    this.editPasajeroItem = null;
    this.limpiarPasajeros();
  }

  // EVENTOS
  // PARA CAMBIAR LAS PARADAS DE LUGAR
  recibirEmit(event: boolean) {
    this.isVisibleModal = event;

    this.emitirAbrirModalAgregar();
  }

  emitirAbrirModalAgregar() {
    this.abrirModalAgregar.emit(false);
  }

  tagSeleccionadoMet(item: ITag) {
    if (
      item.id == 4 &&
      (this.pasajeros.length == 0 || this.formServicios.invalid) &&
      this.listOrdenServicio.length < 0
    ) {
      return;
    }

    if (item.id == 3) {
      this.initMapUntilDefined();
    }
    this.tagActivo = item.id;
  }

  // HTTP
  async getLocalidades() {
    await this._httpImplService
      .guardar('listentity', {})
      .then((value: any) => {
        if (value.response) {
          this.entidadList = value.entities;
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async getCentroCosto() {
    await this._httpImplService
      .guardar('costcenterlist', {})
      .then((value: any) => {
        // this.listCentrosCostos = value.centrosdecosto;
        this.listCentrosCostosBase = value.centrosdecosto;
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }

  async getConfiguracionCampos() {
    if (this.formServicios.get('fk_cliente')?.value) {
      await this._httpImplService
        .guardar('client/consultclient', {
          cliente: this.formServicios.get('fk_cliente')?.value,
        })
        .then((value: any) => {
          this.consultConfiguracion = value.consulta;
          this.enabledCampo();
          this.disabledCampo();
        })
        .catch((reason: any) => {});
    }
  }

  async getCiudades() {
    await this._httpImplService
      .guardar('costcenter/cities/listcity', {})
      .then((value: any) => {
        this.listCiudades = value.ciudades;
      })
      .catch((reason: any) => {});
  }

  async postSolicitudViajesEjecutivos() {
    if (this.listOrdenServicio.length == 0) {
      this.message.info(
        'No es posible generar una solicitud de viaje ejecutivo, no tiene ningun traslado pendiente por enviar'
      );
      return;
    }
    this.enviando = true;
    const json = {
      fk_cliente: this.clienteSeleccionado,
      fk_sede: this.entidadSeleccionada,
      viajes: this.listOrdenServicio,
    };
    await this._httpImplService
      .guardar('client/requesttrips', json)
      .then((value: any) => {
        if (value.response) {
          this.isVisibleModal = true;
          /** Imagen del modal de resultados. */
          this.imgModal =
            '.../../../../../../assets/images/modal/satisfactorio.png';
          /** Título del modal de resultados. */
          this.titleModal = '¡Viaje exitoso!';
          /** Mensaje del modal de resultados. */
          this.messageModal =
            'La solicitud de los viajes se ha realizado correctamente';
        } else {
          this.isVisibleModal = true;
          /** Imagen del modal de resultados. */
          this.imgModal =
            '.../../../../../../assets/images/modal/informacion.png';
          /** Título del modal de resultados. */
          this.titleModal = '¡Viaje no programado!';
          /** Mensaje del modal de resultados. */
          this.messageModal =
            'La solicitud de los viajes no fue posible realizarse, por favor inténtelo nuevamente o comuníquese con el equipo de soporte';
        }
      })
      .catch((reason: any) => {})
      .finally(() => (this.enviando = false));
  }
}
