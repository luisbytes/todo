import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private get instance() {
    return (window as any).FirebasexConfig;
  }

  async setConfig(fetchTimeout: number, minimumFetchInterval: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance?.setConfigSettings(
        { fetchTimeout, minimumFetchInterval },
        () => resolve(),
        (error: string) => reject(error),
      );
    });
  }

  async fetchAndActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.instance?.fetchAndActivate(
        (success: boolean) => resolve(success),
        (error: string) => reject(error),
      );
    });
  }

  async getValue(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.instance?.getValue(
        key,
        (value: string) => resolve(value),
        (error: string) => reject(error),
      );
    });
  }

  async getBoolean(key: string): Promise<boolean> {
    const value = await this.getValue(key);

    return value === 'true';
  }
}
