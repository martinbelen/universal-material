import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [ './material.component.scss' ],
  templateUrl: './material.component.pug'
})
export class MaterialComponent {
  data: any = {};
  constructor(public model: ModelService) {
    this.universalInit();
  }

  universalInit() {
    this.model.get('/data.json').subscribe(data => {
      this.data = data;
    });
  }
}
