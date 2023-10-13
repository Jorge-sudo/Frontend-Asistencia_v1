import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDocenteRoutingModule } from './registerDocente-routing.module';
import { RegisterDocenteComponent } from './registerDocente.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RegisterDocenteRoutingModule,
        InputNumberModule,
        InputTextModule,
        DropdownModule,
        FormsModule
    ],
    declarations: [RegisterDocenteComponent]
})
export class RegisterDocenteModule { }
