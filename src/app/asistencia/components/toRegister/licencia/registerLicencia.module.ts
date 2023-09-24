import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLicenciaRoutingModule } from './registerLicencia-routing.module';
import { RegisterLicenciaComponent } from './registerLicencia.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterLicenciaRoutingModule
    ],
    declarations: [RegisterLicenciaComponent]
})
export class RegisterLicenciaModule { }
