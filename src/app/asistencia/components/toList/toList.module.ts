
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToRegisterRoutingModule } from './toList-routing.module';
import { ListDocenteModule } from './docente/listDocente.module';
import { ListSupervisorModule } from './supervisor/listSupervisor.module';
import { ListAsistenciaModule } from './asistencia/listAsistencia.module';
import { ListAsignaturaModule } from './asignatura/listAsignatura.module';
import { ListLicenciaModule } from './licencia/listLicencia.module';
import { ListMateriaModule } from './materia/listMateria.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToRegisterRoutingModule,
        ListDocenteModule,
        ListSupervisorModule,
        ListLicenciaModule,
        ListAsignaturaModule,
        ListAsistenciaModule,
        ListMateriaModule
    ]
})
export class ToListModule { }
