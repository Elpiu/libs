import { Injectable, Provider } from '@angular/core';
import { AppConfigService, KEY } from './bootsrapApplication';
import { config } from 'rxjs';

@Injectable()
export class FacadeConfigService {
  constructor(private appConfig: AppConfigService) {}

  /**
   * General method to get a configuration by its key.
   * @param configKey - The key associated with the configuration to retrieve.
   * @returns The configuration data associated with the given key.
   */
  public getConfig<T>(configKey: string): T {
    return this.appConfig.getConfig()[configKey]; // Retrieve the configuration value by key and return it
  }

  /**
   * Check if a key exists in the configuration object.
   * @param keyName - The key to check for existence.
   * @returns true if the key exists in the configuration.
   */
  public hasKey(keyName: string): boolean {
    // Check if the key exists in the array of keys stored in the configuration
    return (this.appConfig.getConfig()[KEY] as string[]).includes(keyName);
  }
}

// Create a provider for FacadeConfigService
export const facadeConfigServiceProvider: Provider = {
  provide: FacadeConfigService,
  useClass: FacadeConfigService, // Use the FacadeConfigService class itself
};
