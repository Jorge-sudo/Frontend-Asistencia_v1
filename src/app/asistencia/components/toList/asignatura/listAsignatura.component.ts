import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, concatMap, finalize, map, of } from 'rxjs';
import { Asignatura } from 'src/app/asistencia/api/asignatura';
import { Carrera } from 'src/app/asistencia/api/carrera';
import { DiaSemana } from 'src/app/asistencia/api/diaSemana';
import { Semestre } from 'src/app/asistencia/api/semestre';
import { Turno } from 'src/app/asistencia/api/turno';
import { AsignaturaService } from 'src/app/asistencia/service/asignatura.service';
import { SemestreService } from 'src/app/asistencia/service/semestre.service';
import { CarreraService } from '../../../service/carrera.service';
import { DiaService } from 'src/app/asistencia/service/dia.service';
import { TurnoService } from 'src/app/asistencia/service/turno.service';

@Component({
    templateUrl: './listAsignatura.component.html',
    providers: [MessageService]
})
export class ListAsignaturaComponent implements OnInit{

    loadingButton: boolean = false;
    loading: boolean = true;
    asignaturas: Asignatura[] = [];
    carreras: Carrera[] = [];
    idCarreraSelected: number = 0;
    semestres: Semestre[] = [];
    idSemestreSelected: number = 0;
    diasSemana: DiaSemana[] = [];
    idDiaSemanaSelected: number = 0;
    turnos: Turno[] = [];
    idTurnoSelected: number = 0;
    rows: number = 10;
    numberOfElements: number = 0;
    totalRecords: number = 0;
    totalPages: number = 0;
    order: number = 1;
    sortField: string = 'materia';
    globalFilter: string = '';
    first: number = 0;
    page: number = 0;
    asignaturaSelected: Asignatura = {};
    idFrozen: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private asignaturaService: AsignaturaService ,
                private semestreService: SemestreService,
                private CarreraService: CarreraService,
                private diaSemanaService: DiaService,
                private turnoService: TurnoService,
                private messageService: MessageService) {}


    initData(): void{
        this.loadCarreras().pipe(
            concatMap(() => this.loadDiaSemana()),
            concatMap(() => this.loadSemestres()),
            concatMap(() => this.loadTurnos()),
            finalize(() => {
                this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'Selecciona carrera, dia, semestre y turno. '})
            })
        ).subscribe();
    }


    ngOnInit(): void {
        this.initData();
    }

    loadDataAsignatura(): void{
        this.loadingButton = true;
        this.loadAsignatura().subscribe();
    }


    loadAsignatura(): Observable<any> {
        if(this.idCarreraSelected !== 0 && this.idSemestreSelected !== 0
            && this.idDiaSemanaSelected !== 0 && this.idTurnoSelected !== 0){

                return this.asignaturaService.getAsignaturas(this.order , this.page, this.rows, this.sortField,
                                                            this.idCarreraSelected, this.idDiaSemanaSelected,
                                                            this.idSemestreSelected, this.idTurnoSelected,
                                                            this.globalFilter).pipe(
                    map((result: any) => {
                        this.asignaturas = result.data.content;
                        this.numberOfElements = result.data.numberOfElements;
                        this.totalRecords = result.data.totalElements;
                        this.totalPages = result.data.totalPages;
                        this.loading = !result.view;
                    }),
                    catchError((error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los datos. '});
                        throw error;
                    }),
                    finalize(() => {
                        this.loadingButton = false;
                    })
            );
        }else{
            if(this.idCarreraSelected === 0 ){
                this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona la carrera. '});
            }
            if(this.idSemestreSelected === 0 ){
                this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona el semestre. '});
            }
            if(this.idDiaSemanaSelected === 0 ){
                this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona el dia. '});
            }
            if(this.idTurnoSelected === 0 ){
                this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona el turno. '});
            }
        }
        this.loadingButton = false;
        return of(null);
    }


    loadData(event:any) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'materia' : event.sortField;
        this.page = this.first / this.rows;
        this.loadAsignatura().subscribe();
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        this.globalFilter = (event.target as HTMLInputElement).value;
    }

    loadSemestres(): Observable<any>{
        return this.semestreService.getSemestres().pipe(
            map((result: any) => {
                this.semestres = result.data;
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los semestres. '});
                throw error;
            })
        );
    }

    loadCarreras(): Observable<any>{
        return this.CarreraService.getCarreras().pipe(
            map((result: any) => {
                this.carreras = result.data;
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar las carreras. '});
                throw error;
            })
        );
    }

    loadDiaSemana(): Observable<any>{
        return this.diaSemanaService.getDias().pipe(
            map((result: any) => {
                this.diasSemana = result.data;
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los días de la semana. '});
                throw error;
            })
        );
    }

    loadTurnos(): Observable<any>{
        return this.turnoService.getTurnos().pipe(
            map((result: any) => {
                this.turnos = result.data;
            }),
            catchError((error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los turnos. '});
                throw error;
            })
        );
    }


    eventSelectCarrera(event: any){
        console.log(event)
        this.idCarreraSelected = event.value.id;
    }

    eventSelectSemestre(event: any){
        console.log(event)
        this.idSemestreSelected = event.value.id;
    }

    eventSelectDiaSemana(event: any){
        console.log(event)
        this.idDiaSemanaSelected = event.value.id;
    }

    eventSelectTurno(event: any){
        console.log(event)
        this.idTurnoSelected = event.value.id;
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
