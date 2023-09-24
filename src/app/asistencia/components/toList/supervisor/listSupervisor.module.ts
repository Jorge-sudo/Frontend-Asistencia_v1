import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSupervisorRoutingModule } from './listSupervisor-routing.module';
import { ListSupervisorComponent } from './listSupervisor.component';

@NgModule({
    imports: [
        CommonModule,
        ListSupervisorRoutingModule
    ],
    declarations: [ListSupervisorComponent]
})
export class ListSupervisorModule { }
