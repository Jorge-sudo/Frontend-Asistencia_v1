import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSupervisorRoutingModule } from './registerSupervisor-routing.module';
import { RegisterSupervisorComponent } from './registerSupervisor.component';

@NgModule({
    imports: [
        CommonModule,
        RegisterSupervisorRoutingModule
    ],
    declarations: [RegisterSupervisorComponent]
})
export class RegisterSupervisorModule { }
