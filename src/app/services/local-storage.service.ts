import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorageSubject = new Subject<string>();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        const key = event.key ?? '';
        this.localStorageSubject.next(key);
      }
    });
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getObservable() {
    return this.localStorageSubject.asObservable();
  }
}
