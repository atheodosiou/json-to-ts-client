import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private inputFormValid$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private transform$: Subject<void> = new Subject<void>();

  get transform(): Observable<void> {
    return this.transform$.asObservable();
  }

  get valid(): Observable<boolean> {
    return this.inputFormValid$.asObservable();
  }

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setValid(valid: boolean) {
    this.inputFormValid$.next(valid);
  }

  setLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  triggerTransform() {
    this.transform$.next();
  }
}
