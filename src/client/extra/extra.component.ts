import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'extra',
  styleUrls: [ './extra.component.scss' ],
  templateUrl: './extra.component.pug'
})
export class ExtraComponent {
}
