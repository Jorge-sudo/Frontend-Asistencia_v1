import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, map, tap } from 'rxjs';
import { DocenteLicencia } from 'src/app/asistencia/api/docenteLicencia';
import { DocenteLicenciaService } from 'src/app/asistencia/service/docente-licencia.service';



@Component({
    templateUrl: './listLicencia.component.html',
    providers: [MessageService]
})
export class ListLicenciaComponent implements OnInit{

    selectionsData: any[] = [
        {name: 'Vigentes'},
        {name: 'Antiguos'}
    ];

    dataSelected: any = {name: 'Vigentes'};

    loading: boolean = true;
    docenteLicencias: DocenteLicencia[] = [];
    rows: number = 10;
    numberOfElements: number = 0;
    totalRecords: number = 0;
    totalPages: number = 0;
    order: number = 1;
    sortField: string = 'docente.nombre';
    globalFilter: string = '';
    first: number = 0;
    page: number = 0;
    docenteLicenciaSelected: DocenteLicencia = {};
    idFrozen: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(public docenteLicenciaService: DocenteLicenciaService ,
            private messageService: MessageService) {}


    initData(): void{
        if(this.dataSelected.name.localeCompare('Vigentes') === 0){
            this.loadDocenteLicenciaActive().subscribe();
        }

        if(this.dataSelected.name.localeCompare('Antiguos') === 0){
            this.loadDocenteLicenciaInactive().subscribe();
        }
    }


    ngOnInit(): void {
        this.initData();
    }


    loadData(event:LazyLoadEvent) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'docente.nombre' : event.sortField;

        if(this.globalFilter === '' || this.globalFilter === undefined){
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            // llamar el servicio pasando page y rows
            this.initData();
        }
    }


    onGlobalFilter(table: Table, event: Event) {

        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        this.globalFilter = (event.target as HTMLInputElement).value;

        this.docenteLicenciaService.getDocenteLicenciasFilterGlobal(this.order , this.page,
                                              this.rows, this.sortField,
                                              this.globalFilter).pipe(
            tap((result: any) => {
                this.docenteLicencias = result.data.content;
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
    }

    loadDocenteLicenciaActive(): Observable<any> {
        return this.docenteLicenciaService.getDocenteLicenciasActive(this.order , this.page, this.rows, this.sortField).pipe(
            map((result: any) => {
                this.docenteLicencias = result.data.content;
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

    loadDocenteLicenciaInactive(): Observable<any> {
        return this.docenteLicenciaService.getDocenteLicenciasInactive(this.order , this.page, this.rows, this.sortField).pipe(
            map((result: any) => {
                this.docenteLicencias = result.data.content;
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


    eventSelect(event: any){
        console.log(event);
        this.initData();
    }

    clear(table: Table) {
        this.globalFilter = '';
        this.sortField = 'docente.nombre';
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    }
}
