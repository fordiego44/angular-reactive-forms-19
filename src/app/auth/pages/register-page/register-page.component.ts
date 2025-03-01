import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-register-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent { }
