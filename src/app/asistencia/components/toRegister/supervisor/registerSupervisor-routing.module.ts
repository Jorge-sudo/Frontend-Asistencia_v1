import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterSupervisorComponent } from './registerSupervisor.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterSupervisorComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterSupervisorRoutingModule { }
