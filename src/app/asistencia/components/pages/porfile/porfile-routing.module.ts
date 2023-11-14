import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PorfileComponent } from './porfile.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PorfileComponent }])],
  exports: [RouterModule],
})
export class PorfileRoutingModule {
  
}
