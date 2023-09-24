import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListLicenciaComponent } from './listAsistencia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListLicenciaComponent }
    ])],
    exports: [RouterModule]
})
export class ListLicenciaRoutingModule { }
