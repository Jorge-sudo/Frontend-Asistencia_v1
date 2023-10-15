import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDocenteRoutingModule } from './registerDocente-routing.module';
import { RegisterDocenteComponent } from './registerDocente.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';


@NgModule({
    imports: [
        CommonModule,
        RegisterDocenteRoutingModule,
        ToastModule,
        InputNumberModule,
        InputTextModule,
        RadioButtonModule,
        ReactiveFormsModule,
        PasswordModule,
        FileUploadModule,
        ButtonModule,
        ChipModule
    ],
    declarations: [RegisterDocenteComponent]
})
export class RegisterDocenteModule { }
