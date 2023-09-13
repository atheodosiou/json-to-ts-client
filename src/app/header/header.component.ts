import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AppService } from '../services';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly appService = inject(AppService);
  githubUrl = environment.githubUrl;
  @Input() validInput: boolean | null = false;
  @Output() transform: EventEmitter<void> = new EventEmitter<void>();
}
