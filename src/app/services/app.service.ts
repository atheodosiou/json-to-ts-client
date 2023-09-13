import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { detect } from 'detect-browser';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private publicIP: string = '';
  private ip$: Subject<string> = new Subject<string>();

  private inputFormValid$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private transform$: Subject<void> = new Subject<void>();

  private copy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get ip(): Observable<string> {
    return this.ip$.asObservable();
  }

  get transform(): Observable<void> {
    return this.transform$.asObservable();
  }

  get valid(): Observable<boolean> {
    return this.inputFormValid$.asObservable();
  }

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  get copy(): Observable<boolean> {
    return this.copy$.asObservable();
  }

  setPublicIP(ip: string) {
    this.ip$.next(ip);
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

  triggerCopy() {
    this.copy$.next(true);
    setTimeout(() => {
      this.copy$.next(false);
    }, 2000);
  }

  detectBrowserAndOS() {
    return detect();
  }
}
