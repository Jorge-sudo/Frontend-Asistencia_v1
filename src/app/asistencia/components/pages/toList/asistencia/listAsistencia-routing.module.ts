import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListAsistenciaComponent } from './listAsistencia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListAsistenciaComponent }
    ])],
    exports: [RouterModule]
})
export class ListAsistenciaRoutingModule { }
