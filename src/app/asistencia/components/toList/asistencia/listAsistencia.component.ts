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

@Component({
    templateUrl: './listAsistencia.component.html',
    providers: [MessageService]
})
export class ListAsistenciaComponent implements OnInit{

    dateSearch: Date | undefined;

    semestres: Semestre[] = [];
    carreras: Carrera[] = [];

    idCarreraSelected: number = 0;
    idSemestreSelected: number = 0;

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
      if(this.idCarreraSelected !== 0 && this.idSemestreSelected !== 0){
        return this.asistenciaService.getAsistenciasFindAll(this.order , this.page,
                                                             this.rows, this.sortField,
                                                             this.idCarreraSelected,
                                                             this.idSemestreSelected,
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
    }else{
        if (this.idCarreraSelected === 0) {
          this.messageService.add({
            severity: 'warn',
            summary: this.translate.instant('asistencia.message.warningTitle'),
            detail: this.translate.instant(
              'asistencia.toList.asistencia.valid.messageCarrera'
            ),
          });
        }
        if (this.idSemestreSelected === 0) {
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
      this.idCarreraSelected = event.value.id;
    }

    eventSelectSemestre(event: any){
      this.idSemestreSelected = event.value.id;
    }

    getDateSearchFormat(dateSearch: Date): string{
        const año = dateSearch.getFullYear(); // Obtener el año (ejemplo: 2023)
        const mes = String(dateSearch.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
        const dia = String(dateSearch.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
        return`${año}-${mes}-${dia}`;
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
}
