import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorfileRoutingModule } from './porfile-routing.module';
import { PorfileComponent } from './porfile.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';

@NgModule({
    imports: [
        CommonModule,
        PorfileRoutingModule,
        ToastModule,
        InputNumberModule,
        InputTextModule,
        ReactiveFormsModule,
        PasswordModule,
        FileUploadModule,
        ButtonModule,
        ChipModule,
        MessageModule,
        InputSwitchModule,
        TabViewModule,
        ImageModule
    ],
    declarations: [PorfileComponent]
})
export class PorfileModule { }
