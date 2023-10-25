import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { MateriaCarreraSemestreService } from 'src/app/asistencia/service/materia-carrera-semestre.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { MateriaCarreraSemestre } from 'src/app/asistencia/api/materiaCarreraSemestre';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { CommandMateriaCarreraSemestre } from 'src/app/asistencia/api/command/commandMateriaCarreraSemestre';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: './listMateria.component.html',
  providers: [MessageService, ConfirmationService],
})
export class ListMateriaComponent implements OnInit {
  loading: boolean = true;
  materiaCarreraSemestres: MateriaCarreraSemestre[] = [];
  materiaCarreraSemestreActivo: CommandMateriaCarreraSemestre = {};
  rows: number = 10;
  numberOfElements: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;
  order: number = 1;
  sortField: string = 'materia';
  globalFilter: string = '';
  first: number = 0;
  page: number = 0;
  materiaCarreraSemestreSelected: MateriaCarreraSemestre = {};
  idFrozen: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public materiaCarreraSemestreService: MateriaCarreraSemestreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  loadInit() {
    this.materiaCarreraSemestreService
      .getMateriaCarreraSemestres(
        this.order,
        this.page,
        this.rows,
        this.sortField
      )
      .pipe(
        tap((result: any) => {
          this.materiaCarreraSemestres = result.data.content;
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
            ),
          });
          throw error;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadData(event: any) {
    this.first = Number(event.first);
    this.rows = Number(event.rows);
    this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
    this.sortField =
      event.sortField === undefined || event.sortField === null
        ? 'materia'
        : event.sortField;

    if (this.globalFilter === '' || this.globalFilter === undefined) {
      // Calculamos la página actual
      this.page = Math.floor(this.first / this.rows);
      // llamar el servicio pasando page y rows
      this.materiaCarreraSemestreService
        .getMateriaCarreraSemestres(
          this.order,
          this.page,
          this.rows,
          this.sortField
        )
        .pipe(
          tap((result: any) => {
            this.materiaCarreraSemestres = result.data.content;
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
              ),
            });
            throw error;
          })
        )
        .subscribe();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    this.globalFilter = (event.target as HTMLInputElement).value;

    this.materiaCarreraSemestreService
      .getMateriaCarreraSemestresFilter(
        this.order,
        this.page,
        this.rows,
        this.sortField,
        this.globalFilter
      )
      .pipe(
        tap((result: any) => {
          this.materiaCarreraSemestres = result.data.content;
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
            ),
          });
          throw error;
        })
      )
      .subscribe();
  }

  confirmChangeState(
    event: InputSwitchOnChangeEvent,
    materiaCarreraSemestre: MateriaCarreraSemestre
  ) {
    const newStatus = event.checked
      ? this.translate.instant('asistencia.message.enable')
      : this.translate.instant('asistencia.message.disable');

    this.confirmationService.confirm({
      message:
        this.translate.instant('asistencia.message.confirmMessageQuestion') +
        newStatus +
        ' ?',
      header: this.translate.instant('asistencia.message.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: this.translate.instant('asistencia.message.confirmTitle'),
          detail: this.translate.instant('asistencia.message.confirmMessage'),
        });
        // Llamar al servicio para cambiar el estado
        this.updateMateriaCarreraSemestre(
          materiaCarreraSemestre,
          event
        ).subscribe();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: this.translate.instant('asistencia.message.rejectTitle'),
              detail: this.translate.instant('asistencia.message.rejectMessage'),
            });
            // Revertir el cambio del slide-toggle
            materiaCarreraSemestre.activo = !event.checked;
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: this.translate.instant('asistencia.message.cancelTitle'),
              detail: this.translate.instant('asistencia.message.cancelMessage'),
            });
            materiaCarreraSemestre.activo = !event.checked;
            break;
        }
      },
    });
  }

  updateMateriaCarreraSemestre(
    materiaCarreraSemestre: MateriaCarreraSemestre,
    event: InputSwitchOnChangeEvent
  ): Observable<any> {
    this.materiaCarreraSemestreActivo.idMateriaCarreraSemestre =
      materiaCarreraSemestre.idMateriaCarreraSemestre;
    this.materiaCarreraSemestreActivo.activo = materiaCarreraSemestre.activo;
    return this.materiaCarreraSemestreService
      .updateMateriaCarreraSemestreActivo(this.materiaCarreraSemestreActivo)
      .pipe(
        map((result: any) => {
          const response = result.update;
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('asistencia.message.updated'),
              detail: this.translate.instant('asistencia.message.updatedMessage'),
            });
          }
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('asistencia.message.errorTitle'),
            detail: this.translate.instant('asistencia.message.updateErrorMessage'),
          });
          materiaCarreraSemestre.activo = !event.checked;
          throw error;
        })
      );
  }

  clear(table: Table) {
    this.globalFilter = '';
    this.sortField = 'materia';
    this.order = 1;
    this.page = 0;
    this.rows = 10;
    this.first = 0;
    this.filter.nativeElement.value = '';
    table.clear();
  }
}
