import { Component } from '@angular/core';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { Table } from 'primeng/table';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { Observable, catchError, map, tap } from 'rxjs';
import { Supervisor } from 'src/app/asistencia/api/supervisor';
import { CommandDocenteAndSupervisorActivo } from 'src/app/asistencia/api/command/commandDocenteAndSupervisorActivo';
import { SupervisorService } from 'src/app/asistencia/service/supervisor.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './listSupervisor.component.html',
  providers: [MessageService, ConfirmationService],
})
export class ListSupervisorComponent {
  loading: boolean = true;
  supervisores: Supervisor[] = [];
  supervisorActivo: CommandDocenteAndSupervisorActivo = {};
  supervisorSelected: Supervisor = {};
  idFrozen: boolean = false;

  constructor(
    public supervisorService: SupervisorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  loadInit() {
    this.supervisorService
      .getSupervisores()
      .pipe(
        tap((result: any) => {
          this.supervisores = result.data;
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

  confirmChangeState(event: InputSwitchOnChangeEvent, supervisor: Supervisor) {
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
        this.updateSupervisor(supervisor, event).subscribe();
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
            supervisor.activo = !event.checked;
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: this.translate.instant('asistencia.message.cancelTitle'),
              detail: this.translate.instant('asistencia.message.cancelMessage'),
            });
            supervisor.activo = !event.checked;
            break;
        }
      },
    });
  }

  updateSupervisor(supervisor: Supervisor, event: InputSwitchOnChangeEvent): Observable<any> {
    this.supervisorActivo.ci = supervisor.ci;
    this.supervisorActivo.activo = supervisor.activo;

    return this.supervisorService
      .updateSupervisorActivo(this.supervisorActivo)
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
          supervisor.activo = !event.checked;
          throw error;
        })
      );
  }

  clear(table: Table) {
    table.clear();
  }
}
