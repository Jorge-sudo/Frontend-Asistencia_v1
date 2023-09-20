import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterLicenciaComponent } from './registerLicencia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterLicenciaComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterLicenciaRoutingModule { }
