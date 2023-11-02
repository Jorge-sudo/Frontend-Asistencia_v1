import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AsistenciaService } from '../../../../service/asistencia.service';
import { TransformRegisterAssignMateriaService } from 'src/app/util/transform-register-assign-materia.service';
import { AulaService } from 'src/app/asistencia/service/aula.service';
import { catchError, finalize, tap } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';

@Component({
    templateUrl: './registerAsistencia.component.html',
    providers: [MessageService]
})
export class RegisterAsistenciaComponent implements OnInit {

  optionsAula: any[] = [];
  loading: boolean = false;
  data: FormGroup = new FormGroup({});

  @ViewChild('selectAula') elementSelectAula!: Dropdown;

  constructor(private messageService: MessageService,
              private asistenciaService: AsistenciaService,
              private aulaService: AulaService,
              private transformRegisterAssignMateriaService:
              TransformRegisterAssignMateriaService,) { }

  ngOnInit(): void {
    this.initForm();
    this.initAulas();
  }

  initAulas(): void{
    this.aulaService.getAulas().pipe(
      tap((data: any) =>{
        this.optionsAula = this.transformRegisterAssignMateriaService.aulaToOptionsAula(data.data);
      }),
      catchError((err) => {
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'No se pudo obtener las aulas'
        });
        throw err;
      })
    ).subscribe();
  }

  initForm(): void{
    this.data = new FormGroup({
      ci : new FormControl(0, [
        Validators.required,
        Validators.min(99999),
        Validators.max(999999999),
      ]),
      idAula: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      cantidadEstudiantes: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  eventSelectAula(event: any){
    this.data.get('idAula')?.setValue(event.value.code);
  }

  onSubmit(): void {
    this.loading = true;
    this.asistenciaService.saveAsistencia(this.data.value).pipe(
      tap((data: any) => {
        console.log(data);
        this.messageService.add({
          severity:'success',
          summary: 'Exito',
          detail: `Se registro la asistencia:
                   Hora: ${data.data.horaEntrada},
                   Fecha: ${data.data.fecha},
                   Estado: ${data.data.estado},
                   Cantidad de estudiantes: ${data.data.cantidadEstudiantes},`
        });
        this.clearForm();
      }),
      catchError((err) => {
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'No se pudo registrar la asistencia'
        });
        throw err;
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  clearForm(): void {
    this.data.reset();
    this.elementSelectAula.writeValue(null);
  }

}
