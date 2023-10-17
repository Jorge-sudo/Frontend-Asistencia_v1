import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImageCompressService } from 'src/app/util/image-compress.service';
import { NgxMqttService } from '../../../service/ngx-mqtt/ngx-mqtt.service';
import { RolService } from 'src/app/asistencia/service/rol.service';
import { Rol } from 'src/app/asistencia/api/rol';
import { tap } from 'rxjs';

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
  loading: boolean = false;
  fileUpload?: File ;
  confirmPassword: FormControl = new FormControl('',[Validators.required]);
  passwordEquals: boolean = true;
  roles: Rol[] = [];

  constructor(private messageService: MessageService,
              private imageComprees: ImageCompressService,
              public ngxMqttService: NgxMqttService,
              private rolService: RolService) { }

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
      rol: new FormControl(0, [Validators.required, Validators.min(1)]),
      codRfid: new FormControl('', []),
    });
  }

  onSubmit(): void {
    this.loading = true;
    setTimeout(() => {
        this.loading = false
    }, 2000);
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
