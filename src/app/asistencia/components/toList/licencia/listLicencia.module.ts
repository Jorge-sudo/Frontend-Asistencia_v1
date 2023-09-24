import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLicenciaRoutingModule } from './listLicencia-routing.module';
import { ListLicenciaComponent } from './listLicencia.component';

@NgModule({
    imports: [
        CommonModule,
        ListLicenciaRoutingModule
    ],
    declarations: [ListLicenciaComponent]
})
export class ListLicenciaModule { }
