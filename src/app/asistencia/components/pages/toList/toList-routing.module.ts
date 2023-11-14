import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'asistencia', loadChildren: () => import('./asistencia/listAsistencia.module').then(m => m.ListAsistenciaModule) },
        { path: 'asignatura', loadChildren: () => import('./asignatura/listAsignatura.module').then(m => m.ListAsignaturaModule) },
        { path: 'docente', loadChildren: () => import('./docente/listDocente.module').then(m => m.ListDocenteModule) },
        { path: 'licencia', loadChildren: () => import('./licencia/listLicencia.module').then(m => m.ListLicenciaModule) },
        { path: 'materia', loadChildren: () => import('./materia/listMateria.module').then(m => m.ListMateriaModule) },
        { path: 'supervisor', loadChildren: () => import('./supervisor/listSupervisor.module').then(m => m.ListSupervisorModule) },
        { path: '**', redirectTo: '/extraviado' }
    ])],
    exports: [RouterModule]
})
export class ToRegisterRoutingModule { }
