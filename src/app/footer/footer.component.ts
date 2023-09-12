import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiService } from '../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  apiService = inject(ApiService);
  releaseDate = environment.releaseDate;
  totalConversions = this.apiService
    .getTotalConversions()
    .pipe(takeUntilDestroyed());
}
