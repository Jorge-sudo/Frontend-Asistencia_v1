import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Observable, catchError, concatMap, finalize, map } from 'rxjs';
import { Carrera } from 'src/app/asistencia/api/carrera';
import { Semestre } from 'src/app/asistencia/api/semestre';
import { CarreraService } from 'src/app/asistencia/service/carrera.service';
import { MateriaCarreraSemestreService } from 'src/app/asistencia/service/materia-carrera-semestre.service';
import { MateriaService } from 'src/app/asistencia/service/materia.service';
import { SemestreService } from 'src/app/asistencia/service/semestre.service';

@Component({
    templateUrl: './registerMateria.component.html',
    providers: [MessageService]
})
export class RegisterMateriaComponent implements OnInit{

  materiaNombre: string = '';
  loading: boolean = false;
  loadingMateria: boolean = false;
  selectedSemestres: Semestre[] = [];
  selectedCarreras: Carrera[] = [];
  materiaCarreraSemestre: FormGroup = new FormGroup({});
  materia: FormGroup = new FormGroup({});
  exist: FormControl = new FormControl(true,[Validators.required]);

  @ViewChild('selectCarrera') elementSelectCarrera!: Dropdown;
  @ViewChild('selectSemestre') elementSelectSemestre!: Dropdown;

  constructor(private messageService: MessageService,
              private carreraService: CarreraService,
              private semestreService: SemestreService,
              private materiaService: MateriaService,
              private materiaCarreraSemestreService: MateriaCarreraSemestreService,
              private translate: TranslateService) { }


  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData(): void {
    this.loadCarreras().pipe(
      concatMap(() => this.loadSemestres())
    ).subscribe();
  }

  initForm(): void {
    this.materia = new FormGroup({
      sigla: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.materiaCarreraSemestre = new FormGroup({
      idMateriaCarreraSemestre: new FormControl(0),
      idCarrera: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      sigla: new FormControl(),
      idSemestre: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      activo: new FormControl(true)
    });
  }

  onSubmit(): void {
    this.loading = true;
    if(this.materiaCarreraSemestre.valid){
      if(this.exist.value){
        this.saveMateriaCarreraSemestre().pipe(
          finalize(() => this.loading = false)
        ).subscribe();
      }
    }
    if(this.materia.valid){
      if(!this.exist.value){
        this.materiaCarreraSemestre.get('sigla')?.setValue(this.materia.get('sigla')?.value);
        this.saveMateria().pipe(
          concatMap(() => this.saveMateriaCarreraSemestre()),
          finalize(() => this.loading = false)
        ).subscribe();
      }
    }
  }

  saveMateria(): Observable<any>  {
    return this.materiaService.saveMateria(this.materia.value).pipe(
      map((result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: "Exito",
          detail: `Materia registrada: ${this.materiaNombre} `
        });
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: "Error",
          detail: `Materia con la sigla ${this.materia.get('sigla')?.value} no registrada`
        });
        throw error;
      })
    );
  }

  saveMateriaCarreraSemestre(): Observable<any> {
    return this.materiaCarreraSemestreService.saveMateriaCarreraSemestre(this.materiaCarreraSemestre.value).pipe(
      map((result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: "Exito",
          detail: `Materia agregada a semestre y carrera: ${this.materiaNombre} `
        });
        this.clearForm();
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: "Error",
          detail: `Materia no agregada a semestre y carrera : ${this.materia.get('sigla')?.value} no registrada`
        });
        throw error;
      })
    );
  }

  searchMateria(): void {
    this.loadingMateria = true;
    this.materiaService.getBySiglaMateria(this.materia.get('sigla')?.value).pipe(
      map((result: any) => {
        this.materiaCarreraSemestre.get('sigla')?.setValue(result.data.sigla);
        this.materiaNombre = result.data.nombre;
        this.messageService.add({
          severity: 'success',
          summary: "Exito",
          detail: `Materia encontrada: ${this.materiaNombre} `
        });
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: "Error",
          detail: `Materia con la sigla ${this.materia.get('sigla')?.value} no registrada`
        });
        throw error;
      }),
      finalize(() => this.loadingMateria = false)
    ).subscribe();
  }

  loadCarreras(): Observable<any> {
    return this.carreraService.getCarreras().pipe(
      map((result: any) => {
        this.selectedCarreras = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('asistencia.message.errorTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asignatura.error.messageCarrera'
          ),
        });
        throw error;
      })
    );
  }

  loadSemestres(): Observable<any> {
    return this.semestreService.getSemestres().pipe(
      map((result: any) => {
        this.selectedSemestres = result.data;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('asistencia.message.errorTitle'),
          detail: this.translate.instant(
            'asistencia.toList.asignatura.error.messageSemestre'
          ),
        });
        throw error;
      })
    );
  }

  eventSelectCarrera(event: any): void {
    this.materiaCarreraSemestre.get('idCarrera')?.setValue(event.value.id);
  }

  eventSelectSemestre(event: any): void {
    this.materiaCarreraSemestre.get('idSemestre')?.setValue(event.value.id);
  }

  clearForm(): void {
    this.elementSelectCarrera.writeValue(null);
    this.elementSelectSemestre.writeValue(null);
    this.materiaCarreraSemestre.reset();
    this.materia.reset();
    this.materiaNombre = '';
  }

}
