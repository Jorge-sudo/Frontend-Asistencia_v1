import { Component } from '@angular/core';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Observable, catchError, map, tap } from 'rxjs';
import { Supervisor } from 'src/app/asistencia/api/Supervisor';
import { DocenteAndSupervisorActivo } from 'src/app/asistencia/api/command/DocenteAndSupervisorActivo';
import { SupervisorService } from 'src/app/asistencia/service/supervisor.service';

@Component({
    templateUrl: './listSupervisor.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ListSupervisorComponent {
    loading: boolean = true;
    supervisores: Supervisor[] = [];
    supervisorActivo: DocenteAndSupervisorActivo = {};
    supervisorSelected: Supervisor = {};
    idFrozen: boolean = false;


    constructor(public supervisorService: SupervisorService ,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {}

    loadInit(){
        this.supervisorService.getSupervisores().pipe(
            tap((result: any) => {
                this.supervisores = result.data;
                this.loading = !result.view;
            })
        ).subscribe();
    }

    ngOnInit(): void {
        this.loadInit();
    }

    confirmChangeState(event:InputSwitchOnChangeEvent , supervisor:Supervisor ){

        const newStatus = event.checked ? 'habilitar' : 'deshabilitar';

        this.confirmationService.confirm({
            message: '¿Está seguro de que quieres ' + newStatus+ '?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'has aceptado' });
                // Llamar al servicio para cambiar el estado
                this.updateSupervisor(supervisor).subscribe();
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'has rechazado' });
                        // Revertir el cambio del slide-toggle
                        supervisor.activo = !event.checked;
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'has cancelado' });
                        supervisor.activo = !event.checked;
                        break;
                }
            }
        });
    }


    updateSupervisor(supervisor: Supervisor): Observable<any> {
        this.supervisorActivo.ci = supervisor.ci;
        this.supervisorActivo.activo = supervisor.activo;

        return this.supervisorService.updateSupervisorActivo(this.supervisorActivo).pipe(
            map((result: any) => {
                const response = result.update;
                if (response) {
                this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se ha actualizado el estado del supervisor' });
                }
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido actualizar el estado del supervisor' });
                throw error;
            })
        );
    }


    clear(table: Table) {
        table.clear();
    }

}
