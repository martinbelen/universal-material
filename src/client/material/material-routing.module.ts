import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialComponent } from './material.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'material', component: MaterialComponent }
    ])
  ]
})
export class MaterialRoutingModule { }
