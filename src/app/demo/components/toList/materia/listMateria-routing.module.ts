import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListMateriaComponent } from './listMateria.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListMateriaComponent }
    ])],
    exports: [RouterModule]
})
export class ListMateriaRoutingModule { }
