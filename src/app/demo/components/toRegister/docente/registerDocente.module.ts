import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDocenteRoutingModule } from './registerDocente-routing.module';
import { RegisterDocenteComponent } from './registerDocente.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterDocenteRoutingModule
    ],
    declarations: [RegisterDocenteComponent]
})
export class RegisterDocenteModule { }
