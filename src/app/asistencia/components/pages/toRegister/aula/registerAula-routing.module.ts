import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterAulaComponent } from './registerAula.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterAulaComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterAulaRoutingModule { }
