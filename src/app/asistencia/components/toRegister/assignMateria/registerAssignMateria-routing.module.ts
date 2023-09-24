import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterAssignMateriaComponent } from './registerAssignMateria.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterAssignMateriaComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterAssignMateriaRoutingModule { }
