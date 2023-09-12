import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  delay,
  finalize,
  map,
  of,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppService } from './app.service';

@Injectable()
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly appService = inject(AppService);

  private readonly url = environment.serverUrl;
  constructor() {}

  convert(jsonString: string): Observable<string[]> {
    this.appService.setLoading(true);
    return this.httpClient.post<any>(`${this.url}/json-to-ts`, jsonString).pipe(
      catchError(this.handleError),
      finalize(() => this.appService.setLoading(false))
    );
  }

  getTotalConversions(): Observable<number> {
    return this.httpClient
      .get<{ totalConversions: number }>(
        `${this.url}/statistics/conversions/total`
      )
      .pipe(
        map((x) => x.totalConversions),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
