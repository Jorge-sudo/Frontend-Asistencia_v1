import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Aula } from 'src/app/asistencia/api/aula';
import { Materia } from 'src/app/asistencia/api/materia';

@Component({
    templateUrl: './registerAssignMateria.component.html',
    providers: [MessageService]
})
export class RegisterAssignMateriaComponent {

  options: any[]= [1, 2];
  data: FormGroup = new FormGroup({});
  sigla: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)]);
  horarioMateriaDocente1: FormGroup = new FormGroup({});
  horarioMateriaDocente2: FormGroup = new FormGroup({});
  materias: Materia[] = [];
  aulas: Aula[] = [];
  aulaSelected: Aula = {} ;

  constructor(private messageService: MessageService) { }

  onSubmit(): void {
    this.initForm();
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
          Validators.minLength(1),
        ]),
      }),
      aulaMateriaDocente: new FormGroup({
        idAula: new FormControl(0, [Validators.required, Validators.min(1)]),
      }),
      horarioMateriaDocentes: new FormArray([])
    });

    this.horarioMateriaDocente1 = new FormGroup({
      laboratorio: new FormControl(false, [Validators.required]),
      nroLaboratorio: new FormControl(0, [Validators.required]),
      idHorario: new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    this.horarioMateriaDocente2 = new FormGroup({
      laboratorio: new FormControl(false, [Validators.required]),
      nroLaboratorio: new FormControl(0, [Validators.required]),
      idHorario: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

}
