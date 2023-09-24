import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAssignMateriaRoutingModule } from './registerAssignMateria-routing.module';
import { RegisterAssignMateriaComponent } from './registerAssignMateria.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterAssignMateriaRoutingModule
    ],
    declarations: [RegisterAssignMateriaComponent]
})
export class RegisterAssignMateriaModule { }
