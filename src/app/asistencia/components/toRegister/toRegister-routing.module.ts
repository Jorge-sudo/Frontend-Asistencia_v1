import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'asistencia', loadChildren: () => import('./asistencia/registerAsistencia.module').then(m => m.RegisterAsistenciaModule) },
        { path: 'asignar_materia', loadChildren: () => import('./assignMateria/registerAssignMateria.module').then(m => m.RegisterAssignMateriaModule) },
        { path: 'docente', loadChildren: () => import('./docente/registerDocente.module').then(m => m.RegisterDocenteModule) },
        { path: 'licencia', loadChildren: () => import('./licencia/registerLicencia.module').then(m => m.RegisterLicenciaModule) },
        { path: 'supervisor', loadChildren: () => import('./supervisor/registerSupervisor.module').then(m => m.RegisterSupervisorModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ToRegisterRoutingModule { }
