import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterMateriaRoutingModule } from './registerMateria-routing.module';
import { RegisterMateriaComponent } from './registerMateria.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterMateriaRoutingModule
    ],
    declarations: [RegisterMateriaComponent]
})
export class RegisterMateriaModule { }
