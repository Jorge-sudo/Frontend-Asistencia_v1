import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImageCompressService } from 'src/app/util/image-compress.service';
import { NgxMqttService } from '../../../service/ngx-mqtt/ngx-mqtt.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { DocenteService } from 'src/app/asistencia/service/docente.service';
import { PersonaService } from 'src/app/asistencia/service/persona.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { SupervisorService } from 'src/app/asistencia/service/supervisor.service';
import { AuthService } from '../../auth/service/auth.service';
import { FileUpload } from 'primeng/fileupload';
import { UserWithToken } from '../../auth/api/UserWithToken';
import { Router } from '@angular/router';



@Component({
  templateUrl: './porfile.component.html',
  providers: [MessageService]
})
export class PorfileComponent implements OnInit {

  userInfo : any = {};
  isSupervisor: boolean = false;
  data: FormGroup = new FormGroup({});
  updatePassword: FormGroup = new FormGroup({});
  progress: number = 0;
  loadingInfo: boolean = false;
  loadingPassword: boolean = false;
  loadingDocente: boolean = false;
  loadingImage: boolean = false;
  fileUpload?: File ;
  user: UserWithToken = {};

  @ViewChild('file') fileComponent!: FileUpload;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private imageComprees: ImageCompressService,
              public  ngxMqttService: NgxMqttService,
              private docenteService: DocenteService,
              private personaService: PersonaService,
              private superisorService: SupervisorService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.data = new FormGroup({
      //creamos todos los atributos de supervisor dentro del from
      ci: new FormControl(0, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      activo: new FormControl(true, [Validators.required]),
    });
    this.updatePassword = new FormGroup({
      //creamos todos los atributos de supervisor dentro del from
      ci: new FormControl(0, [Validators.required]),
      contrasenia: new FormControl('', [
            Validators.required]),
      contraseniaNueva: new FormControl('', [
        Validators.required,
        Validators.minLength(8)]),
    });
    this.authService.user$.pipe(
      tap((data: any) => {
        this.user = data;
        this.isSupervisorVerify(data.ci);
        this.data.controls['ci'].setValue(data.ci);
        this.updatePassword.controls['ci'].setValue(data.ci);
      })
    ).subscribe();
  }

  isSupervisorVerify(ci: number){
    this.superisorService.getSupervisorByCi(ci).pipe(
      tap((data: any) => {
        this.isSupervisor = true;
        this.userInfo = data.data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      finalize(() => {
        if(this.isSupervisor){
          this.initFormSupervisor();
        }else{
          this.initFormDocente();
        }
        this.initData(ci);
      })
    ).subscribe();
  }

  initData(ci: number): void{
    if(!this.isSupervisor){
      this.docenteService.getDocenteByCi(ci).pipe(
        tap((data: any) => {
          this.userInfo = data.data;
        })
      ).subscribe();
    }
  }


  initFormSupervisor(): void {
    this.data.addControl('reporteEmail', new FormControl(true, [Validators.required]));
    this.data.addControl('reporteInstitucional', new FormControl(true, [Validators.required]));
  }

  initFormDocente(): void{
    this.data.addControl('codRfid', new FormControl('', []));
  }

  onSubmitInfo(): void {
    this.loadingInfo = true;
    if(this.isSupervisor){
      this.saveSupervisor();
    }else{
      this.saveDocente();
    }
  }

  saveDocente(): void{
    this.data.controls['codRfid'].setValue(this.ngxMqttService.messageDocenteRegister.codigoRfid);
    this.docenteService.updateDocentePerfil(this.data.value).pipe(
      tap((data: any) => {
        if(data.update){
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se actualizo la información.'});
          this.clearForm();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la información.'});
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingInfo = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Iniciar Session',
          detail:  `Su correo electrónico ha sido actualizado exitosamente.
                    Por favor, inicie sesión nuevamente con su nueva
                    dirección de correo para continuar.
                    Será redirigido automáticamente a la página de inicio.
                    `
        });
        // Ejecutar después de 2 segundos
        setTimeout(() => {
          this.router.navigateByUrl('/autenticación/acceso');
        }, 2000); // 2 segundos en milisegundos
      })
    ).subscribe();
  }

  saveSupervisor(): void{
    this.superisorService.updateSupervisorPerfil(this.data.value).pipe(
      tap((data: any) => {
        if(data.update){
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se actualizo la información.'});
          this.clearForm();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la información.'});
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingInfo = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Iniciar Session',
          detail:  `Su correo electrónico ha sido actualizado exitosamente.
                    Por favor, inicie sesión nuevamente con su nueva
                    dirección de correo para continuar.
                    Será redirigido automáticamente a la página de inicio.
                    `
        });
        // Ejecutar después de 2 segundos
        setTimeout(() => {
          this.router.navigateByUrl('/autenticación/acceso');
        }, 2000); // 2 segundos en milisegundos
      })
    ).subscribe();
  }

  onSubmitPassword(): void {
    this.loadingPassword = true;
    this.personaService.updatePassword(this.updatePassword.value).pipe(
      tap((data: any) => {
        if(data.update){
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se actualizo la contraseña.'});
          this.clearFormPassword();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contraseña actual incorrecta.'});
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingPassword = false;
      })
    ).subscribe();
  }


  updateImage(): void{
    if(this.fileUpload !== undefined){
      this.personaService.saveImagePersona(this.fileUpload, this.data.get('ci')?.value).pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // El archivo se está subiendo, puedes mostrar el progreso aquí
            this.progress = Math.round(100 * (event.loaded / (event.total ?? event.loaded)));
            this.loadingImage = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Cargado',
              detail: `Archivo actualizado: ${this.progress}%`
            });
            this.messageService.add({
              severity: 'info',
              summary: 'Informacion',
              detail: 'Los cambios de la imagen se notaran en la proxima sesión.'
            });
            this.fileUpload = undefined;
            this.fileComponent.clear();
          }
        }),
        catchError((error: any) => {
          // Manejar el error aquí
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizado la imagen.'});
          this.loadingImage = false;
          return throwError(() => error);
        })
      ).subscribe();
    }
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

  onClear(event:any): void{
    this.fileUpload = undefined;
  }

  clearMqttRegistrarDocente(){
    this.ngxMqttService.messageDocenteRegister.codigoRfid = '';
    this.ngxMqttService.cardRfidLoad = false;
  }

  clearForm(){
    this.data.reset();
    this.progress = 0;
    this.clearMqttRegistrarDocente();
  }

  clearFormPassword(){
    this.updatePassword.reset();
  }

}
