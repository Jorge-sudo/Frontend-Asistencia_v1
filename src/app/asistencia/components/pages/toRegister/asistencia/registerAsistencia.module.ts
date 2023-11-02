import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAsistenciaRoutingModule } from './registerAsistencia-routing.module';
import { RegisterAsistenciaComponent } from './registerAsistencia.component';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        RegisterAsistenciaRoutingModule,
        MessageModule,
        ReactiveFormsModule,
        ToastModule,
        ChipModule,
        InputNumberModule,
        DropdownModule,
        ButtonModule
    ],
    declarations: [RegisterAsistenciaComponent]
})
export class RegisterAsistenciaModule { }
