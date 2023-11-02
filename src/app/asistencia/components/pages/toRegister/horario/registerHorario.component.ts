import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { Observable, catchError, concatMap, finalize, map, tap } from 'rxjs';
import { DiaSemana } from 'src/app/asistencia/api/diaSemana';
import { Turno } from 'src/app/asistencia/api/turno';
import { DiaService } from 'src/app/asistencia/service/dia.service';
import { HorarioService } from 'src/app/asistencia/service/horario.service';
import { TurnoService } from 'src/app/asistencia/service/turno.service';

@Component({
    templateUrl: './registerHorario.component.html',
    providers: [MessageService]
})
export class RegisterHorarioComponent implements OnInit {

  horario: FormGroup = new FormGroup({});
  optionsTurno: Turno[] = [];
  optionsDia: DiaSemana[] = [];
  loading: boolean = false;

  @ViewChild('selectDia') elementSelectDia!: Dropdown;
  @ViewChild('selectTurno') elementSelectTurno!: Dropdown;
  @ViewChild('horaInicio') elementHoraInicio!: Calendar;
  @ViewChild('horaFin') elementHoraFin!: Calendar;

  constructor(private messageService: MessageService,
              private turnoService: TurnoService,
              private diaService: DiaService,
              private horarioService: HorarioService) { }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initData(): void {
    this.loadDiaSemana().pipe(
      concatMap(() => this.loadTurnos())
    ).subscribe();
  }

  initForm(): void {
    this.horario = new FormGroup({
      idHorario: new FormControl(0, []),
      horaInicio: new FormControl('', [Validators.required]),
      horaFin: new FormControl('', [Validators.required]),
      idDia: new FormControl(0, [Validators.required, Validators.min(1)]),
      idTurno: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  loadDiaSemana(): Observable<any> {
    return this.diaService.getDias().pipe(
      map((result: any) => {
        this.optionsDia = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los dias de la semana',
        });
        throw error;
      })
    );
  }

  loadTurnos(): Observable<any> {
    return this.turnoService.getTurnos().pipe(
      map((result: any) => {
        this.optionsTurno = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los turnos',
        });
        throw error;
      })
    );
  }

  onSubmit():void {
    this.loading = true;
    this.horarioService.saveHorario(this.horario.value).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Horario guardado correctamente',
        });
        this.clearForm();
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar el horario',
        });
        throw error;
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  eventSelectDia(event: any):void {
    this.horario.get('idDia')?.setValue(event.value.id);
  }

  eventSelectTurno(event: any):void {
    this.horario.get('idTurno')?.setValue(event.value.id);
  }

  eventSelectHoraInicio(event: any):void {
    this.horario.get('horaInicio')?.setValue(this.convertHour(event));
  }

  eventSelectHoraFin(event: any):void {
    this.horario.get('horaFin')?.setValue(this.convertHour(event));
  }

  clearForm():void {
    this.horario.reset();
    this.elementSelectDia.writeValue(null);
    this.elementSelectTurno.writeValue(null);
    this.elementHoraInicio.writeValue(null);
    this.elementHoraFin.writeValue(null);
  }

  convertHour(fecha: any): string {
    const fechaObj = new Date(fecha);
    return fechaObj.getHours() + ":" + fechaObj.getMinutes() + ":" + fechaObj.getSeconds();
  }

 }
