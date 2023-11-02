import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHorarioRoutingModule } from './registerHorario-routing.module';
import { RegisterHorarioComponent } from './registerHorario.component';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        RegisterHorarioRoutingModule,
        InputTextModule,
        MessageModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule,
        CalendarModule,
        DropdownModule
    ],
    declarations: [RegisterHorarioComponent]
})
export class RegisterHorarioModule { }
