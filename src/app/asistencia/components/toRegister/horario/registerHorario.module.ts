import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHorarioRoutingModule } from './registerHorario-routing.module';
import { RegisterHorarioComponent } from './registerHorario.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterHorarioRoutingModule
    ],
    declarations: [RegisterHorarioComponent]
})
export class RegisterHorarioModule { }
