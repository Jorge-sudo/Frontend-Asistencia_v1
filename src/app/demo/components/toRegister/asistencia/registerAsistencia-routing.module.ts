import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterAsistenciaComponent } from './registerAsistencia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterAsistenciaComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterAsistenciaRoutingModule { }
