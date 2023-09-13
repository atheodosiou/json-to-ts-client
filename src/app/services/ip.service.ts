import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private readonly http = inject(HttpClient);

  getIpAddress(): Observable<string> {
    return this.http
      .get<{ ip: string }>('https://api.ipify.org/?format=json')
      .pipe(
        map((res) => res.ip),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
