import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterDocenteComponent } from './registerDocente.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterDocenteComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterDocenteRoutingModule { }
