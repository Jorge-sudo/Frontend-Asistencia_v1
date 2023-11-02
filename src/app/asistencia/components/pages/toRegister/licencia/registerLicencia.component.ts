import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Observable, catchError, concatMap, map } from 'rxjs';
import { DocenteLicenciaService } from 'src/app/asistencia/service/docente-licencia.service';
import { LicenciaService } from 'src/app/asistencia/service/licencia.service';

@Component({
    templateUrl: './registerLicencia.component.html',
    providers: [MessageService]
})
export class RegisterLicenciaComponent implements OnInit {

  numberDate: number = 0;
  licenciaLoading: boolean = false;
  docenteLicenciaLoading: boolean = false;
  licencia: FormGroup = new FormGroup({});
  docenteLicencia: FormGroup = new FormGroup({});
  loading: boolean = false;
  minDate!: Date;
  maxDate!: Date;

  @ViewChild('fechas') elementFechas!: Calendar;

  constructor(private messageService: MessageService,
              private licenciaService: LicenciaService,
              private docenteLicenciaService: DocenteLicenciaService) { }

  ngOnInit(): void {
    this.initForm();
    this.initDate()
  }

  initForm(): void {
    this.licencia = new FormGroup({
      id: new FormControl(0),
      fechaInicio: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      fechaFinal: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      descripcion: new FormControl( '', [
        Validators.required,
        Validators.minLength(50),
      ]),
    });
    this.docenteLicencia = new FormGroup({
      idDocenteLicencia: new FormControl(0),
      idLicencia: new FormControl(0, [
        Validators.required,
        Validators.min(1),
      ]),
      ci: new FormControl(0, [
        Validators.required,
        Validators.min(99999),
        Validators.max(999999999),
      ]),
    });
  }

  initDate(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.minDate.setDate(today.getDate());

    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  eventSelectDate(event: any): void {
    this.numberDate++;
    if(this.numberDate === 3){
      this.numberDate = 1;
    }
    if(this.numberDate === 1) {
      this.licencia.controls['fechaInicio'].setValue(this.convertDate(event));
      this.licencia.controls['fechaFinal'].setValue('');
    }
    if (this.numberDate === 2) {
      this.licencia.controls['fechaFinal'].setValue(this.convertDate(event));
    }
  }

  convertDate(fecha: Date): string{
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11.
    const día = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${día}`;
  }

  saveData(): void{
    this.saveLicencia().pipe(
      concatMap(() => this.saveDocenteLicencia())
    ).subscribe();
  }

  onSubmit(): void {
    this.saveData();
  }

  saveLicencia(): Observable<any> {
    return this.licenciaService.saveLicencia(this.licencia.value).pipe(
      map((response: any) => {
        this.docenteLicencia.controls['idLicencia'].setValue(response.data.id);
        this.licenciaLoading = true;
      }),
      catchError((err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la licencia',
        });
        return err;
      })
    );
  }

  saveDocenteLicencia(): Observable<any> {
    return this.docenteLicenciaService.saveDocenteLicencia(this.docenteLicencia.value).pipe(
      map((response: any) => {
        this.docenteLicenciaLoading = true;
        if(this.licenciaLoading && this.docenteLicenciaLoading) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Se registró la licencia correctamente',
          });
        }
        this.clearForm();
      }),
      catchError((err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo asignar la licencia al docente',
        });
        return err;
      })
    );
  }


  clearForm(): void {
    this.licencia.reset();
    this.docenteLicencia.reset();
    this.clearDate();
    this.elementFechas.writeValue(null);
  }

  clearDate(): void {
    this.numberDate = 0;
    this.licencia.controls['fechaInicio'].setValue('');
    this.licencia.controls['fechaFinal'].setValue('');
  }
}
