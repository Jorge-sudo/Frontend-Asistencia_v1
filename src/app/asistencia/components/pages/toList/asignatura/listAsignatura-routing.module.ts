import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListAsignaturaComponent } from './listAsignatura.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListAsignaturaComponent }
    ])],
    exports: [RouterModule]
})
export class AsignaturaRoutingModule { }
