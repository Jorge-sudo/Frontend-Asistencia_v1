import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMateriaRoutingModule } from './listMateria-routing.module';
import { ListMateriaComponent } from './listMateria.component';

@NgModule({
    imports: [
        CommonModule,
        ListMateriaRoutingModule
    ],
    declarations: [ListMateriaComponent]
})
export class ListMateriaModule { }
