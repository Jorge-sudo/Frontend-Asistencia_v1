import { Component, ElementRef, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, tap } from 'rxjs';
import { Asistencia } from 'src/app/asistencia/api/asistencia';
import { AsistenciaService } from 'src/app/asistencia/service/asistencia.service';

@Component({
    templateUrl: './listAsistencia.component.html',
    providers: [MessageService]
})
export class ListAsistenciaComponent {

    dateSearch: Date | undefined;

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

    constructor(public asistenciaService: AsistenciaService ,
                private messageService: MessageService) {}

    loadInit(date: string){
        this.asistenciaService.getAsistenciasFindAllByDate(this.order, this.page,
                                                            this.rows, this.sortField,
                                                            date).pipe(
            tap((result: any) => {
                this.asistencias = result.data.content;
                this.numberOfElements = result.data.numberOfElements;
                this.totalRecords = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.loading = !result.view;
            })
        ).subscribe();
    }

    ngOnInit(): void {
        this.loadInit(this.getDateToday());
    }

    loadData(event:LazyLoadEvent) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'horaEntrada' : event.sortField;
        const date = this.dateSearch == undefined || this.dateSearch == null
                ? this.getDateToday()
                : this.getDateSearchFormat(this.dateSearch!);

        if(this.globalFilter === '' || this.globalFilter === undefined){
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            // llamar el servicio pasando page y rows
            this.asistenciaService.getAsistenciasFindAllByDate(this.order , this.page,
                                                                this.rows, this.sortField,
                                                                date).pipe(
                tap((result: any) => {
                    this.asistencias = result.data.content;
                    this.numberOfElements = result.data.numberOfElements;
                    this.totalRecords = result.data.totalElements;
                    this.totalPages = result.data.totalPages;
                    this.loading = !result.view;
                }),
                catchError((error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los datos. '});
                    throw error;
                })
            ).subscribe();
        }else{
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            this.loadDataGlobalFilter().subscribe();
        }
    }


    onGlobalFilter(table: Table, event: Event) {

        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        this.globalFilter = (event.target as HTMLInputElement).value;

        this.loadDataGlobalFilter().subscribe();
    }

    loadDataGlobalFilter(): Observable<any> {
        return this.asistenciaService.getAsistenciasFilter(this.order , this.page,
                                            this.rows, this.sortField,
                                            this.globalFilter).pipe(
            tap((result: any) => {
                this.asistencias = result.data.content;
                this.numberOfElements = result.data.numberOfElements;
                this.totalRecords = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.loading = !result.view;
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los datos. '});
                throw error;
            })
        );
    }


    onSelect(event: Event){
        console.log('focus ' + this.dateSearch);
        this.loadInit(this.getDateSearchFormat(this.dateSearch!));
        console.log(event);
    }


    getDateToday(): string{
        const fecha = new Date(); // Obtener la fecha actual
        const año = fecha.getFullYear(); // Obtener el año (ejemplo: 2023)
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
        const dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
        return`${año}-${mes}-${dia}`;
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
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    }
}
