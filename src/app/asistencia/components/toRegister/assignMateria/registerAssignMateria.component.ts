import { TransformRegisterAssignMateriaService } from './../../../../util/transform-register-assign-materia.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Aula } from 'src/app/asistencia/api/aula';
import { MateriaCarreraSemestre } from 'src/app/asistencia/api/materiaCarreraSemestre';
import { MateriaCarreraSemestreService } from '../../../service/materia-carrera-semestre.service';
import { catchError, tap } from 'rxjs';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { AulaService } from 'src/app/asistencia/service/aula.service';
import { HorarioService } from 'src/app/asistencia/service/horario.service';
import { Horario } from 'src/app/asistencia/api/horario';
import { AsignaturaService } from 'src/app/asistencia/service/asignatura.service';

@Component({
    templateUrl: './registerAssignMateria.component.html',
    providers: [MessageService]
})
export class RegisterAssignMateriaComponent implements OnInit{

  optionsAula: any[] = [];
  optionsHorario: any[] = [];
  optionsMateriaCarreraSemestre: any[] = [] ;
  optionsNumberHorario: any[]= [1, 2];
  successDocente: boolean = false;
  loading: boolean = false;
  data: FormGroup = new FormGroup({});
  horarioMateriaDocente1: FormGroup = new FormGroup({});
  horarioMateriaDocente2: FormGroup = new FormGroup({});
  sigla: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)]);

  horario1Selected: Horario = {} ;
  horario2Selected: Horario = {} ;
  aulaSelected: Aula = {} ;

  constructor(private messageService: MessageService,
              private materiaCarreraSemestreService:MateriaCarreraSemestreService,
              private docenteService: DocenteService,
              private aulaService: AulaService,
              private horarioService: HorarioService,
              private transformRegisterAssignMateriaService:TransformRegisterAssignMateriaService,
              private asignaturaService: AsignaturaService) { }

  ngOnInit(): void {
    this.initForm();
    this.initAulas();
    this.initHorarios();
  }

  initForm(): void {
    this.data = new FormGroup({
      materiaDocente: new FormGroup({
        ci: new FormControl('', [
          Validators.required,
          Validators.min(99999),
          Validators.max(999999999
        )]),
        idMateriaCarreraSemestre: new FormControl(0, [
          Validators.required,
          Validators.min(1),
        ]),
      }),
      aulaMateriaDocente: new FormGroup({
        idAula: new FormControl(0, [Validators.required, Validators.min(1)]),
      }),
      horarioMateriaDocentes: new FormArray([])
    });
    this.horarioMateriaDocente1 = new FormGroup({
      laboratorio: new FormControl(false, [Validators.required]),
      nroLaboratorio: new FormControl(0, []),
      idHorario: new FormControl(0, [Validators.required, Validators.min(1)]),
    }),
    this.horarioMateriaDocente2 = new FormGroup({
      laboratorio: new FormControl(false, [Validators.required]),
      nroLaboratorio: new FormControl(0, []),
      idHorario: new FormControl(0, [Validators.required, Validators.min(1)]),
    })

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

  initHorarios(): void{
    this.horarioService.getHorarios().pipe(
      tap((data: any) =>{
        this.optionsHorario = this.transformRegisterAssignMateriaService.horarioToOptionsHorario(data.data);
      }),
      catchError((err) => {
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'No se pudo obtener los horarios'
        });
        throw err;
      })
    ).subscribe();
  }

  onSubmit(): void {
    (this.data.get('horarioMateriaDocentes') as FormArray).push(this.horarioMateriaDocente1);
    (this.data.get('horarioMateriaDocentes') as FormArray).push(this.horarioMateriaDocente2);
    this.asignaturaService.saveAsignatura(this.data.value).pipe(
      tap((data: any) =>{
        this.messageService.add({
          severity:'success',
          summary: 'Success',
          detail: 'Materia asignada'
        });
        this.clearForm();
      }),
      catchError((err) => {
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'No se pudo asignar la materia'
        });
        throw err;
      })
    ).subscribe();
  }

  searchMaterias(): void {
    if(this.sigla.valid){
      this.materiaCarreraSemestreService.getMateriaCarreraSemestreBySigla(this.sigla.value).pipe(
        tap((data: any) =>{
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Materia encontrada'});
          this.optionsMateriaCarreraSemestre = this.transformRegisterAssignMateriaService.materiaCarreraSemestreToOptionsMateria(data.data);
        }),
        catchError((err) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo obtener las materias'});
          throw err;
        })
      ).subscribe();
    }
  }

  searchDocente(): void {
    this.docenteService.getDocenteByCi(this.data.get('materiaDocente')?.get('ci')?.value).pipe(
      tap((data: any) =>{
        this.messageService.add({
          severity:'success',
          summary: 'Success',
          detail: `Docente ${data.data.nombre} ${data.data.apellido} encontrado.`
        });
        this.successDocente = data.view;
      }),
      catchError((err) => {
        this.data.get('materiaDocente')?.get('ci')?.setValue(0);
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'No se pudo obtener el docente'
        });
        throw err;
      })
    ).subscribe();
  }

  eventSwitchLaboratorio1(event: any){
    if(event.checked){
      this.horarioMateriaDocente1.get('nroLaboratorio')?.
        setValidators([Validators.required, Validators.min(1), Validators.max(15)]);
    }else{
      this.horarioMateriaDocente1.get('nroLaboratorio')?.clearValidators();
      this.horarioMateriaDocente1.get('nroLaboratorio')?.updateValueAndValidity();
    }
  }

  eventSwitchLaboratorio2(event: any){
    if(event.checked){
      this.horarioMateriaDocente2.get('nroLaboratorio')?.
        setValidators([Validators.required, Validators.min(1), Validators.max(15)]);
    }else{
      this.horarioMateriaDocente2.get('nroLaboratorio')?.clearValidators();
      this.horarioMateriaDocente2.get('nroLaboratorio')?.updateValueAndValidity();
    }
  }

  eventSelectMateria(event: any){
    this.data.get('materiaDocente')?.get('idMateriaCarreraSemestre')?.setValue(event.value.code);
  }

  eventSelectAula(event: any){
    this.data.get('aulaMateriaDocente')?.get('idAula')?.setValue(event.value.code);
  }


  eventSelectHorario1(event: any){
    this.horarioMateriaDocente1.get('idHorario')?.setValue(event.value.code);
  }


  eventSelectHorario2(event: any){
    this.horarioMateriaDocente2.get('idHorario')?.setValue(event.value.code);
  }

  clearForm(){
    this.data.reset();
    this.sigla.reset();
    this.successDocente = false;
  }

}
