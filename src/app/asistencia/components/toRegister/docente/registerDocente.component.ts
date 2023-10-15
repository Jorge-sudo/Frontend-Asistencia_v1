import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImageCompressService } from 'src/app/util/image-compress.service';
import { NgxMqttService } from '../../../service/ngx-mqtt/ngx-mqtt.service';

// Expresión regular que verifica si el correo institucional tiene un formato de texto.texto.numero
//si no se cumple ese formato nos lanzara error
const formatCorreoInstitucional: RegExp = /^[a-zA-Z]+\.[a-zA-Z]+$/;
// Expresión regular que verifica si la contraseña tiene por lo menos debe tener 1 texto, 1 numero y 1 caracteres especial
const formatContrasenia: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,}$/;

const correoIntitucionalForm: string = '@servicios.usalesiana.edu.bo';


@Component({
  templateUrl: './registerDocente.component.html',
  providers: [MessageService]
})
export class RegisterDocenteComponent implements OnInit {

  docente: FormGroup = new FormGroup({});
  fileUpload: File = new File([], '');

  constructor(private messageService: MessageService,
              private imageComprees: ImageCompressService,
              public ngxMqttService: NgxMqttService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.docente = new FormGroup({
      //creamos todos los atributos de docente dentro del from
      ci: new FormControl(0, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(11),
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
      correoInstitucional: new FormControl('' + correoIntitucionalForm, [
        Validators.required,
        Validators.email,
        Validators.pattern(formatCorreoInstitucional),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(formatContrasenia),
      ]),
      rol: new FormControl(0, [Validators.required]),
      codRfid: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
    });
  }

  onSubmit(): void {}

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
    console.log(event)
    this.fileUpload = new File([], '');
  }

  estatusMqttRfidCard(){
    if(this.ngxMqttService.messageDocenteRegister.codigoRfid != ''){
      this.ngxMqttService.tarjetaRfidCargado = true;
      this.docente.controls['codRfid']
            .setValue(
              this.ngxMqttService.messageDocenteRegister.codigoRfid
            );
    }

    this.ngxMqttService.tarjetaRfidCargado = false;
  }

  clearMqttRegistrarDocente(){
    this.ngxMqttService.messageDocenteRegister.codigoRfid = '';
  }

}
