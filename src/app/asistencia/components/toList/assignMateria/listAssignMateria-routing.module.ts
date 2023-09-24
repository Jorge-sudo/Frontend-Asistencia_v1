import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListAssignMateriaComponent } from './listAssignMateria.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListAssignMateriaComponent }
    ])],
    exports: [RouterModule]
})
export class AssignMateriaRoutingModule { }
