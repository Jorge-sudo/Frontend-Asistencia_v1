import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAsistenciaRoutingModule } from './registerAsistencia-routing.module';
import { RegisterAsistenciaComponent } from './registerAsistencia.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterAsistenciaRoutingModule
    ],
    declarations: [RegisterAsistenciaComponent]
})
export class RegisterAsistenciaModule { }
