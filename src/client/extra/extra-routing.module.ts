import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExtraComponent } from './extra.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'extra', component: ExtraComponent }
    ])
  ]
})
export class ExtraRoutingModule { }
