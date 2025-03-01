import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent { }
