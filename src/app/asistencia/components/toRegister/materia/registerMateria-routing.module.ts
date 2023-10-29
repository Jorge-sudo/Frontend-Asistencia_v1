import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterMateriaComponent } from './registerMateria.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterMateriaComponent }
    ])],
    exports: [RouterModule]
})
export class RegisterMateriaRoutingModule { }
