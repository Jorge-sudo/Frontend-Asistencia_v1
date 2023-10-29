import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterHorarioComponent } from './registerHorario.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterHorarioComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterHorarioRoutingModule { }
