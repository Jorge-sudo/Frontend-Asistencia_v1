import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImageCompressService } from 'src/app/util/image-compress.service';
import { NgxMqttService } from '../../../service/ngx-mqtt/ngx-mqtt.service';
import { RolService } from 'src/app/asistencia/service/rol.service';
import { Rol } from 'src/app/asistencia/api/rol';
import { Observable, catchError, concatMap, finalize, tap, throwError } from 'rxjs';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { PersonaService } from 'src/app/asistencia/service/persona.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

// Expresión regular que verifica si el correo institucional tiene un formato de texto.texto.numero
//si no se cumple ese formato nos lanzara error
const formatCorreoInstitucional = /^[a-zA-Z]+\.[a-zA-Z]+@servicios\.usalesiana\.edu\.bo$/;
// Expresión regular que verifica si la contraseña tiene por lo menos debe tener 1 texto, 1 numero y 1 caracteres especial

@Component({
  templateUrl: './registerDocente.component.html',
  providers: [MessageService]
})
export class RegisterDocenteComponent implements OnInit {

  docente: FormGroup = new FormGroup({});
  progress: number = 0;
  loading: boolean = false;
  loadingDocente: boolean = false;
  loadingImage: boolean = false;
  fileUpload?: File ;
  confirmPassword: FormControl = new FormControl('',[Validators.required]);
  passwordEquals: boolean = true;
  roles: Rol[] = [];

  constructor(private messageService: MessageService,
              private imageComprees: ImageCompressService,
              public ngxMqttService: NgxMqttService,
              private rolService: RolService,
              private docenteService: DocenteService,
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.initRoles();
    this.initForm();
  }

  initRoles(){
    this.rolService.getRoles().pipe(
      tap((data: any) => {
        this.roles = data.data;
      })
    ).subscribe();
  }

  initForm(): void {
    this.docente = new FormGroup({
      //creamos todos los atributos de docente dentro del from
      ci: new FormControl(0, [
        Validators.required,
        Validators.min(99999),
        Validators.max(999999999),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      fotografia: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      genero: new FormControl('', [Validators.required]),
      correoInstitucional: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(formatCorreoInstitucional),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20)
      ]),
      activo: new FormControl(true, [Validators.required]),
      rol: new FormControl(0, [Validators.required, Validators.min(1)]),
      codRfid: new FormControl('', []),
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.docente.get('codRfid')?.setValue(this.ngxMqttService.messageDocenteRegister.codigoRfid);
    this.saveDocente().pipe(
      concatMap(() => {
        return this.saveImageDocente();
      }),
      finalize(() => {
        if(this.loadingDocente && this.loadingImage){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sus datos se guardaron correctamente.'});
        }
        this.loading = false;
        this.clearForm();
      })
    ).subscribe();
  }

  clearForm(){
    this.docente.reset();
    this.confirmPassword.reset();
    this.fileUpload = undefined;
    this.passwordEquals = true;
    this.progress = 0;
    this.clearMqttRegistrarDocente();
  }

  saveDocente(): Observable<any>{
    return this.docenteService.saveDocente(this.docente.value).pipe(
      tap(data => {
        this.loadingDocente = data.save;
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Docente guardado correctamente.'});
      }),
      catchError(error => {
        // Aquí puedes agregar el código que se ejecutará cuando ocurra un error al insertar el docente
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el docente.'});
        return throwError(() => error);
      }));
  }

  saveImageDocente(): Observable<any>{
    let result = new Observable<HttpEvent<any>>();
    if(this.fileUpload !== undefined){
      result = this.personaService.saveImagePersona(this.fileUpload, this.docente.get('ci')?.value).pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // El archivo se está subiendo, puedes mostrar el progreso aquí
            this.progress = Math.round(100 * (event.loaded / (event.total ?? event.loaded)));
            console.log(`Archivo subido: ${this.progress}%`);
            this.loadingImage = true;
            this.messageService.add({ severity: 'info', summary: 'Cargando', detail: `Archivo subido: ${this.progress}%`});
          }
          return event;
        }),
        catchError((error: any) => {
          // Manejar el error aquí
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la imagen.'});
          this.loadingImage = false;
          return throwError(() => error);
        }));
    }
    return result;
  }

  async onSelect(event:any) {
    if(event.currentFiles.length !== 0){
      await this.imageComprees.compressFile(event.currentFiles[0], event.currentFiles[0].name).then(
        (result: File | undefined) => {
          if(result !== undefined){
            this.fileUpload = result as File;
            this.messageService.add({
              severity: 'info',
              summary: 'Imagen Cargado',
              detail: 'Se comprimio la imagen.'
            });
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo comprimir la imagen.'
            });
          }

        }
      );
    }
  }

  eventSelectRol(event:any){
    this.docente.get('rol')?.setValue(event.value.id);
  }

  comparePassword(){
    this.passwordEquals = this.docente.get('contrasenia')?.value !== this.confirmPassword.value;
  }

  onClear(event:any): void{
    this.fileUpload = undefined;
  }


  clearMqttRegistrarDocente(){
    this.ngxMqttService.messageDocenteRegister.codigoRfid = '';
  }

}
