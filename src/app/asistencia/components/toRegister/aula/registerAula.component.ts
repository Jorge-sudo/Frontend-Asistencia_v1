import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, finalize, tap } from 'rxjs';
import { AulaService } from 'src/app/asistencia/service/aula.service';

@Component({
    templateUrl: './registerAula.component.html',
    providers: [MessageService]
})
export class RegisterAulaComponent implements OnInit {

  aula: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor(private messageService: MessageService,
              private aulaService: AulaService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.aula = new FormGroup({
      id: new FormControl(0, []),
      aula: new FormControl('', [ Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(6)]),
      paralelo: new FormControl('', [ Validators.required,
                                      Validators.minLength(3),
                                      Validators.maxLength(4)]),
      piso: new FormControl('', [ Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(3)]),
      bloque: new FormControl('', [ Validators.required,
                                    Validators.minLength(1),
                                    Validators.maxLength(1)]),
    });
  }

  onSubmit():void {
    this.loading = true;
    this.aulaService.saveAula(this.aula.value).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Se registró la aula correctamente'
        });
        this.clearForm();
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la aula'
        });
        return err;
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  clearForm():void {
    this.aula.reset();
  }
}
