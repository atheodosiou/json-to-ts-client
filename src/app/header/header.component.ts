import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AppService } from '../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly appService = inject(AppService);
  @Input() validInput: boolean | null = false;
  @Output() transform: EventEmitter<void> = new EventEmitter<void>();
}
