import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterMateriaRoutingModule } from './registerMateria-routing.module';
import { RegisterMateriaComponent } from './registerMateria.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        RegisterMateriaRoutingModule,
        ButtonModule,
        ChipModule,
        MessageModule,
        DropdownModule,
        InputTextModule,
        RadioButtonModule,
        ReactiveFormsModule,
        ToastModule,
        InputSwitchModule
    ],
    declarations: [RegisterMateriaComponent]
})
export class RegisterMateriaModule { }
