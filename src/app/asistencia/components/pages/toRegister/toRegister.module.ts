import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToRegisterRoutingModule } from './toRegister-routing.module';
import { RegisterAsistenciaModule } from './asistencia/registerAsistencia.module';
import { RegisterAssignMateriaModule } from './assignMateria/registerAssignMateria.module';
import { RegisterAulaModule } from './aula/registerAula.module';
import { RegisterDocenteModule } from './docente/registerDocente.module';
import { RegisterHorarioModule } from './horario/registerHorario.module';
import { RegisterLicenciaModule } from './licencia/registerLicencia.module';
import { RegisterMateriaModule } from './materia/registerMateria.module';
import { RegisterSupervisorModule } from './supervisor/registerSupervisor.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToRegisterRoutingModule,
        RegisterAsistenciaModule,
        RegisterAssignMateriaModule,
        RegisterAulaModule,
        RegisterDocenteModule,
        RegisterHorarioModule,
        RegisterLicenciaModule,
        RegisterMateriaModule,
        RegisterSupervisorModule
    ]
})
export class ToRegisterModule { }
