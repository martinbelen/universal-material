import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MaterialComponent } from './material.component';
import { MaterialRoutingModule } from './material-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialRoutingModule
  ],
  declarations: [
    MaterialComponent
  ]
})
export class MaterialModule { }
