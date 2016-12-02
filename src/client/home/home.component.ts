import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  selector: 'home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.pug'
})
export class HomeComponent {
}