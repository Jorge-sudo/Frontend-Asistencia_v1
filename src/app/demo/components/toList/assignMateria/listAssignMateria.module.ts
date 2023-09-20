import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignMateriaRoutingModule } from './listAssignMateria-routing.module';
import { ListAssignMateriaComponent } from './listAssignMateria.component';

@NgModule({
    imports: [
        CommonModule,
        AssignMateriaRoutingModule
    ],
    declarations: [ListAssignMateriaComponent]
})
export class ListAssignMateriaModule { }
