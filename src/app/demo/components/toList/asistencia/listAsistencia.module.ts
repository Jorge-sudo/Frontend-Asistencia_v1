import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLicenciaRoutingModule } from './listAsistencia-routing.module';
import { ListLicenciaComponent } from './listAsistencia.component';

@NgModule({
    imports: [
        CommonModule,
        ListLicenciaRoutingModule
    ],
    declarations: [ListLicenciaComponent]
})
export class ListLicenciaModule { }
