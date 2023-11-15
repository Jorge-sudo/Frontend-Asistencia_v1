
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, concatMap, finalize, map, of, tap } from 'rxjs';
import { Asistencia } from 'src/app/asistencia/api/asistencia';
import { AsistenciaService } from 'src/app/asistencia/service/asistencia.service';
import { TranslateService } from '@ngx-translate/core';
import { Calendar } from 'primeng/calendar';
import { SemestreService } from 'src/app/asistencia/service/semestre.service';
import { CarreraService } from 'src/app/asistencia/service/carrera.service';
import { Semestre } from 'src/app/asistencia/api/semestre';
import { Carrera } from 'src/app/asistencia/api/carrera';
import { Dropdown } from 'primeng/dropdown';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: './listAsistencia.component.html',
    providers: [MessageService]
})
export class ListAsistenciaComponent implements OnInit{

  dateSearch: Date | undefined;

  semestres: Semestre[] = [];
  carreras: Carrera[] = [];

  exportColumns: any[] = [];

  carreraSelected: Carrera = {id: 0};
  semestreSelected: Semestre = { id: 0};

  loading: boolean = true;
  asistencias: Asistencia[] = [];
  rows: number = 10;
  numberOfElements: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;
  order: number = 1;
  sortField: string = 'horaEntrada';
  globalFilter: string = '';
  first: number = 0;
  page: number = 0;
  asistenciaSelected: Asistencia = {};
  idFrozen: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('inputDate') elementInputDate!: Calendar;
  @ViewChild('selectCarrera') elementSelectCarrera!: Dropdown;
  @ViewChild('selectSemestre') elementSelectSemestre!: Dropdown;

  constructor(public asistenciaService: AsistenciaService ,
              private messageService: MessageService ,
              private translate: TranslateService,
              private semestreService: SemestreService,
              private carreraService: CarreraService) {}

  loadInit(){
      this.loadSemestres().pipe(
          concatMap(() => this.loadCarreras()),
          finalize(() => {
            this.messageService.add({
              severity: 'info',
              summary: this.translate.instant('asistencia.message.infoTitle'),
              detail: this.translate.instant(
                'asistencia.toList.asistencia.initInfo'
              ),
            });
            this.loading = false;
          })
      ).subscribe();
  }

  ngOnInit(): void {
      this.loadInit();
      this.initColumns();
  }

  loadSemestres(): Observable<any> {
    return this.semestreService.getSemestres().pipe(
      map((result: any) => {
        this.semestres = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('asistencia.message.errorTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asignatura.error.messageSemestre'
          ),
        });
        throw error;
      })
    );
  }

  loadCarreras(): Observable<any> {
    return this.carreraService.getCarreras().pipe(
      map((result: any) => {
        this.carreras = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('asistencia.message.errorTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asignatura.error.messageCarrera'
          ),
        });
        throw error;
      })
    );
  }

  loadAsistencias(): Observable<any> {
    if(this.carreraSelected.id !== 0 && this.semestreSelected.id !== 0){
      return this.asistenciaService.getAsistenciasFindAll(this.order , this.page,
                                                            this.rows, this.sortField,
                                                            this.carreraSelected.id!,
                                                            this.semestreSelected.id!,
                                                            this.getDateSearchFormat(this.dateSearch!),
                                                            this.globalFilter).pipe(
        tap((result: any) => {
          this.asistencias = result.data.content;
          this.numberOfElements = result.data.numberOfElements;
          this.totalRecords = result.data.totalElements;
          this.totalPages = result.data.totalPages;
          this.loading = !result.view;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('asistencia.message.errorTitle'),
            detail: this.translate.instant(
              'asistencia.message.errorDataMesage'
            )
          });
          throw error;
        })
      );
    } else {
      if (this.carreraSelected.id === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: this.translate.instant('asistencia.message.warningTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asistencia.valid.messageCarrera'
          ),
        });
      }
      if (this.semestreSelected.id === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: this.translate.instant('asistencia.message.warningTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asistencia.valid.messageSemestre'
          ),
        });
      }
      return of(null);
    }
  }

  loadData(event:any) {
      this.first = Number(event.first);
      this.rows = Number(event.rows);
      this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
      this.sortField = event.sortField === undefined || event.sortField === null ? 'horaEntrada' : event.sortField;

      // Calculamos la página actual
      this.page = Math.floor(this.first / this.rows);
      this.loadAsistencias().subscribe();
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      this.globalFilter = (event.target as HTMLInputElement).value;
  }

  onSelect(event: any){
    this.loadAsistencias().subscribe();
  }

  eventSelectCarrera(event: any){
    this.carreraSelected = event.value;
  }

  eventSelectSemestre(event: any){
    this.semestreSelected = event.value;
  }

  getDateSearchFormat(dateSearch: Date): string{
      const año = dateSearch.getFullYear(); // Obtener el año (ejemplo: 2023)
      const mes = String(dateSearch.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
      const dia = String(dateSearch.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
      return`${año}-${mes}-${dia}`;
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
              // Obtener fecha/hora actual
          const today = new Date();
          const date = today.toLocaleDateString();
          const time = today.toLocaleTimeString();
          const dateSearch = this.dateSearch?.toLocaleDateString();

          // Calcular posición de texto centrado
          const pageWidth = doc.internal.pageSize.getWidth();
          const textWidth = doc.getTextWidth('Reporte de Asistencias');
          const x1 = (pageWidth - textWidth) / 2;
          const data = this.dataForExport();

          // Agregar título centrado
          doc.text('Reporte de Asistencias', x1, 20);

          doc.setFontSize(8);
          // Agregar fecha y hora
          doc.text(`Fecha de Reporte: ${date} `, x1, 30);
          doc.text(`Hora de Reporte: ${time}`, x1, 40);

          // Agregar fecha de búsqueda
          doc.text(`Fecha de Asistencia: ${dateSearch}`, 30, 50);
          // Agregar carrera y semestre
          doc.text(`Carrera: ${this.carreraSelected.nombre}`, 30, 60);
          doc.text(`Semestre: ${this.semestreSelected.nombre}`, 30, 70);
          // Agregar cantidad de asistencias
          doc.text(`Cantidad de Asistencias:  ${this.numberOfElements} de ${this.totalRecords}(total)`, 30, 80);

          (doc as any).autoTable({
            startY: 90,
            columns: this.exportColumns,
            body: data,
            //agregamos el tamaño de texto
            styles: { fontSize: 7 }
          });

          doc.save(`Asistencia_${this.carreraSelected.nombre}_${this.semestreSelected.nombre}_${dateSearch}.pdf`);
          });
    });
  }

  exportExcel() {
    const data = this.dataForExport();
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();
    const dateSearch = this.dateSearch?.toLocaleDateString();

    import('xlsx').then((xlsx) => {
      // Crear un libro vacío
      const workbook = xlsx.utils.book_new();
      // Crear un arreglo bidimensional con el texto del encabezado y el pie de página
      const headerFooter = [
        ["Reporte de Asistencias", "", "", "", "", "", "Fecha de Reporte: " + date],
        ["", "", "", "", "", "", "Hora de Reporte: " + time],
        ["Fecha de Asistencia: " + dateSearch, "", "", "", "", "", ""],
        ["Carrera: " + this.carreraSelected.nombre, "", "", "", "", "", ""],
        ["Semestre: " + this.semestreSelected.nombre, "", "", "", "", "", ""],
        ["Cantidad de Asistencias:  " + this.numberOfElements + " de " + this.totalRecords + "(total)", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""], // Dejar una fila vacía entre el encabezado y los datos
        this.exportColumns // Agregar los títulos de las columnas
      ];
      // Crear una hoja de trabajo con el arreglo bidimensional
      const ws = xlsx.utils.aoa_to_sheet(headerFooter);
      // Agregar los datos JSON a la hoja de trabajo a partir de la fila 9
      xlsx.utils.sheet_add_json(ws, data, {origin: "A9"});
      // Agregar la hoja de trabajo al libro con el nombre "data"
      xlsx.utils.book_append_sheet(workbook, ws, "data");
      // Escribir el libro en un buffer
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      // Guardar el archivo Excel
      this.saveAsExcelFile(excelBuffer,
        `Asistencia_${this.carreraSelected.nombre}${this.semestreSelected.nombre}${dateSearch}.xlsx`);
    });

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      saveAs.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  dataForExport(): any{
    let id = 1;
    return this.asistencias.map((asistencia) => ({
      id: id++,
      nombreDocente: asistencia.nombreDocente,
      apellidoDocente: asistencia.apellidoDocente,
      horaEntrada: asistencia.horaEntrada,
      fecha: asistencia.fecha,
      cantidadEstudiantes: asistencia.cantidadEstudiantes,
      estadoAsistencia: asistencia.estadoAsistencia,
      laboratorio: asistencia.laboratorio ? 'Si' : 'No',
      aula: `${asistencia.paralelo} - ${asistencia.aula} - ${asistencia.piso} - ${asistencia.bloque}` ,
      horario: `${asistencia.horaInicio} - ${asistencia.horaFin}`,
      nombreMateria: `${asistencia.sigla} - ${asistencia.nombreMateria}`
    }));
  }

  clear(table: Table) {
      this.globalFilter = '';
      this.sortField = 'horaEntrada';
      this.elementInputDate.writeValue(null);
      this.elementSelectCarrera.writeValue(null);
      this.elementSelectSemestre.writeValue(null);
      this.order = 1;
      this.page = 0;
      this.rows = 10;
      this.first = 0;
      this.filter.nativeElement.value = '';
      table.clear();
  }

  initColumns(): void{
    this.exportColumns = [
      {
        title: 'Nro',
        dataKey: 'id'
      },
      {
         title: 'Apellido',
         dataKey: 'apellidoDocente'
      },
      {
         title: 'Hora de Entrada',
         dataKey: 'horaEntrada'
      },
      {
         title: 'Fecha',
         dataKey: 'fecha'
      },
      {
         title: 'Cantidad de Estudiantes',
         dataKey: 'cantidadEstudiantes'
      },
      {
         title: 'Estado de Asistencia',
         dataKey: 'estadoAsistencia'
      },
      {
         title: 'Aula',
         dataKey: 'aula'
      },
      {
         title: 'Laboratorio',
         dataKey: 'laboratorio'
      },
      {
         title: 'Horario',
         dataKey: 'horario'
      },
      {
         title: 'Materia',
         dataKey: 'nombreMateria'
      }
    ];
  }
}
