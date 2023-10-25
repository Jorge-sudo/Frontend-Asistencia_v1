import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAssignMateriaRoutingModule } from './registerAssignMateria-routing.module';
import { RegisterAssignMateriaComponent } from './registerAssignMateria.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        RegisterAssignMateriaRoutingModule,
        DropdownModule,
        ReactiveFormsModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        InputSwitchModule
    ],
    declarations: [RegisterAssignMateriaComponent]
})
export class RegisterAssignMateriaModule { }
