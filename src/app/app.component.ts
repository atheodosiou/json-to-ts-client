import { Component, inject } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .progress {
        animation: progress 1s infinite linear;
      }

      .left-right {
        transform-origin: 0% 50%;
      }
      
      @keyframes progress {
        0% {
          transform: translateX(0) scaleX(0);
        }
        40% {
          transform: translateX(0) scaleX(0.4);
        }
        100% {
          transform: translateX(100%) scaleX(0.5);
        }
      }
    `,
  ],
})
export class AppComponent {
  public readonly appService = inject(AppService);
}
