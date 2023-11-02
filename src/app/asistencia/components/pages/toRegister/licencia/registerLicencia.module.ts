import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLicenciaRoutingModule } from './registerLicencia-routing.module';
import { RegisterLicenciaComponent } from './registerLicencia.component';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        RegisterLicenciaRoutingModule,
        InputNumberModule,
        MessageModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule,
        CalendarModule,
        InputTextareaModule
    ],
    declarations: [RegisterLicenciaComponent]
})
export class RegisterLicenciaModule { }
