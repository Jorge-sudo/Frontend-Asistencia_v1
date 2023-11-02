import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListSupervisorComponent } from './listSupervisor.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListSupervisorComponent }
    ])],
    exports: [RouterModule]
})
export class ListSupervisorRoutingModule { }
