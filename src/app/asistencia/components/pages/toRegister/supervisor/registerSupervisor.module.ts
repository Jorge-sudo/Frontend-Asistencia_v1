import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSupervisorRoutingModule } from './registerSupervisor-routing.module';
import { RegisterSupervisorComponent } from './registerSupervisor.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        RegisterSupervisorRoutingModule,
        ToastModule,
        InputNumberModule,
        InputTextModule,
        RadioButtonModule,
        ReactiveFormsModule,
        PasswordModule,
        FileUploadModule,
        ButtonModule,
        MessageModule,
        DropdownModule,
        InputSwitchModule
    ],
    declarations: [RegisterSupervisorComponent]
})
export class RegisterSupervisorModule { }
