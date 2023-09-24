import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { finalize, tap } from 'rxjs';
import { Docente } from 'src/app/asistencia/api/Docente';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './listDocente.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ListDocenteComponent implements OnInit{


    columnFilter: string[] = ['ci','nombre','apellido','email'];

    limit: number = 10;
    totalRecords: number = 0;

    page: number = 0;

    docenteSelected: Docente = {};

    statuses: any[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;


    @ViewChild('filter') filter!: ElementRef;

    constructor(public docenteService: DocenteService) {


    }

    async loadInit(){
        await this.docenteService.getDocentes(this.page, this.limit, 'nombre');
    }

    ngOnInit(): void {
        this.loadInit();
    }


    onPageChange(event:any) {
        console.log(event);
        this.page = Number(event.first);
        this.limit = Number(event.rows);

        // llamar el servicio pasando page y limit
        this.docenteService.getDocentes(this.page, this.limit, "nombre");
    }

    onSort() {

    }



    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

}
