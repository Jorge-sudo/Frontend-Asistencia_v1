import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListDocenteComponent } from './listDocente.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListDocenteComponent }
    ])],
    exports: [RouterModule]
})
export class ListDocenteRoutingModule { }
