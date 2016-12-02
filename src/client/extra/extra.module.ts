import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExtraComponent } from './extra.component';
import { ExtraRoutingModule } from './extra-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ExtraRoutingModule
  ],
  declarations: [
    ExtraComponent
  ]
})
export class ExtraModule { }
