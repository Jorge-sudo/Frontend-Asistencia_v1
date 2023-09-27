import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { tap } from 'rxjs';
import { Docente } from 'src/app/asistencia/api/Docente';

@Component({
    templateUrl: './listDocente.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ListDocenteComponent implements OnInit{

    loading: boolean = true;
    docentes: Docente[] = [];
    columnFilter: string[] = ['ci','nombre','apellido','email'];
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

    constructor(public docenteService: DocenteService) {}

    loadInit(){
        this.docenteService.getDocentes(this.order, this.page, this.rows, this.sortField).pipe(
            tap((result: any) => {
                this.docentes = result.data.content;
                this.numberOfElements = result.data.numberOfElements;
                this.totalRecords = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.loading = false;
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
                    this.loading = false;
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
                this.loading = false;
            })
        ).subscribe();
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
