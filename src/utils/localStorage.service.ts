/* eslint-disable consistent-return */
export class LocalStorageService {
  private static LSEnabled() {
    return 'localStorage' in globalThis;
  }

  static getAccessValue(key:string):string | null {
    if (!LocalStorageService.LSEnabled()) return null;
    return localStorage.getItem(key);
  }

  static setAccessValue(key:string, token:string) {
    if (!LocalStorageService.LSEnabled()) return null;
    localStorage.setItem(key, token);
  }

  static clearAccessValue(key:string) {
    if (!LocalStorageService.LSEnabled()) return null;

    localStorage.removeItem(key);
  }
}
