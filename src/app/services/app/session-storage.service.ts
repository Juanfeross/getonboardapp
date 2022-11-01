import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public getItemString(key: string) {
    return sessionStorage.getItem(key) ?? '';
  }

  public stringifyItem(key: string, item: any) {
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  public parseItem<T>(key: string) {
    return JSON.parse(sessionStorage.getItem(key) ?? '') as T;
  }

  public setItem(key: string, item: any) {
    sessionStorage.setItem(key, item);
  }

  public getItemJSON(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || '{}');
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public clear() {
    sessionStorage.clear();
  }
}
