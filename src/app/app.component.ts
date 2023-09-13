import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IpService } from './services';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly appService = inject(AppService);
  private readonly ipService = inject(IpService);
  metadata: any;

  constructor() {
    this.ipService
      .getIpAddress()
      .pipe(
        tap((ip) => this.appService.setPublicIP(ip)),
        takeUntilDestroyed()
      )
      .subscribe();

    this.appService.ip.pipe(takeUntilDestroyed()).subscribe((ip) => {
      this.metadata = { ip, ...this.appService.detectBrowserAndOS() };
      console.log(this.metadata);
    });
  }
}
