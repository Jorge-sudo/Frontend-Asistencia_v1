import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocenteRoutingModule } from './listDocente-routing.module';
import { ListDocenteComponent } from './listDocente.component';

@NgModule({
    imports: [
        CommonModule,
        ListDocenteRoutingModule
    ],
    declarations: [ListDocenteComponent]
})
export class ListDocenteModule { }
