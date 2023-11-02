import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAulaComponent } from './registerAula.component';
import { RegisterAulaRoutingModule } from './registerAula-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        RegisterAulaRoutingModule,
        InputTextModule,
        MessageModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule
    ],
    declarations: [RegisterAulaComponent]
})
export class RegisterAulaModule { }
