import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, LazyLoadEvent, ConfirmEventType } from 'primeng/api';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { Docente } from 'src/app/asistencia/api/Docente';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { DocenteAndSupervisorActivo } from 'src/app/asistencia/api/command/DocenteAndSupervisorActivo';

@Component({
    templateUrl: './listDocente.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ListDocenteComponent implements OnInit{

    loading: boolean = true;
    docentes: Docente[] = [];
    docenteActivo: DocenteAndSupervisorActivo = {};
    rows: number = 10;
    numberOfElements: number = 0;
    totalRecords: number = 0;
    totalPages: number = 0;
    order: number = 1;
    sortField: string = 'nombre';
    globalFilter: string = '';
    first: number = 0;
    page: number = 0;
    docenteSelected: Docente = {};
    idFrozen: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(public docenteService: DocenteService ,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {}

    loadInit(){
        this.docenteService.getDocentes(this.order, this.page, this.rows, this.sortField).pipe(
            tap((result: any) => {
                this.docentes = result.data.content;
                this.numberOfElements = result.data.numberOfElements;
                this.totalRecords = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.loading = !result.view;
            })
        ).subscribe();
    }

    ngOnInit(): void {
        this.loadInit();
    }

    loadData(event:LazyLoadEvent) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'nombre' : event.sortField;

        if(this.globalFilter === '' || this.globalFilter === undefined){
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            // llamar el servicio pasando page y rows
            this.docenteService.getDocentes(this.order , this.page, this.rows, this.sortField).pipe(
                tap((result: any) => {
                    this.docentes = result.data.content;
                    this.numberOfElements = result.data.numberOfElements;
                    this.totalRecords = result.data.totalElements;
                    this.totalPages = result.data.totalPages;
                    this.loading = !result.view;
                })
            ).subscribe();
        }
    }


    onGlobalFilter(table: Table, event: Event) {

        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        this.globalFilter = (event.target as HTMLInputElement).value;

        this.docenteService.getDocentesFilter(this.order , this.page,
                                              this.rows, this.sortField,
                                              this.globalFilter).pipe(
            tap((result: any) => {
                this.docentes = result.data.content;
                this.numberOfElements = result.data.numberOfElements;
                this.totalRecords = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.loading = !result.view;
            })
        ).subscribe();
    }

    confirmChangeState(event:InputSwitchOnChangeEvent , docente:Docente ){

        const newStatus = event.checked ? 'habilitar' : 'deshabilitar';

        this.confirmationService.confirm({
            message: '¿Está seguro de que quieres ' + newStatus+ '?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'has aceptado' });
                // Llamar al servicio para cambiar el estado
                this.updateDocente(docente).subscribe();
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'has rechazado' });
                        // Revertir el cambio del slide-toggle
                        docente.activo = !event.checked;
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'has cancelado' });
                        docente.activo = !event.checked;
                        break;
                }
            }
        });
    }


    updateDocente(docente: Docente): Observable<any> {
        this.docenteActivo.ci = docente.ci;
        this.docenteActivo.activo = docente.activo;

        return this.docenteService.updateDocenteActivo(this.docenteActivo).pipe(
            map((result: any) => {
                const response = result.update;
                if (response) {
                this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se ha actualizado el estado del docente' });
                }
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido actualizar el estado del docente' });
                throw error;
            })
        );
    }


    clear(table: Table) {
        this.globalFilter = '';
        this.sortField = 'nombre';
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    }

}