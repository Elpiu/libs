import {
  ApplicationConfig,
  ApplicationRef,
  makeEnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';
import { bootstrapApplication as boot } from '@angular/platform-browser';
import { facadeConfigServiceProvider } from './facade-config.service';

declare global {
  interface Window {
    __config: Record<string, any>;
  }
}

// To read config Keys
export const KEY = 'KEY';

export class AppConfigService {
  // Constructor to initialize the service with configuration data
  constructor(private data: any) {}

  /**
   * Method to retrieve the loaded configuration.
   * Throws an error if the configuration has not been loaded yet.
   *
   * @returns { [key: string]: any } - The configuration data object.
   */
  public getConfig(): { [key: string]: any } {
    if (!this.data) throw new Error('Configuration not loaded yet!'); // Error if data is missing
    return this.data;
  }
}

/**
 * Wrapper function to bootstrap an Angular application.
 * This function fetches configuration files from given URLs, registers the configuration service,
 * and allows dynamic registration of additional providers based on the loaded configuration.
 *
 * @param urls - An object with key-value pairs where the key is a config name and the value is the URL to load the config from.
 * @param defaul - Default configuration values (optional).
 * @param rootComponent - The root Angular component to bootstrap the application.
 * @param options - Optional configuration for the application, such as providers.
 * @param providersFunction - Optional array of functions that take the AppConfigService as an argument and return additional providers to be registered.
 * @returns A promise resolving to the ApplicationRef after the application has been bootstrapped.
 */
export async function bootstrapApplication(
  urls: { [key: string]: string },
  defaul: any,
  rootComponent: Type<unknown>,
  injectFacadeConfigService = true,
  options?: ApplicationConfig,
  providersFunction?: ((appConfig: AppConfigService) => Provider[])[]
): Promise<ApplicationRef> {
  console.debug(`Loading configuration files: ${JSON.stringify(urls)}`);

  // Object to store the loaded configuration data
  const config: Record<string, any> = {};

  // Fetch each configuration file concurrently
  const fetchPromises = Object.entries(urls).map(async ([key, url]) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Handle error for failed fetch
        throw new Error('Not 2xx response: ' + response.status);
      }
      const data = await response.json();
      return { key, data };
    } catch (error: any) {
      // Log a warning if fetch fails
      console.warn(
        `Configuration file could not be loaded for ${key}: ` + error.message
      );
      return { key, data: null };
    }
  });

  // Wait for all fetch requests to complete
  const results = await Promise.all(fetchPromises);

  // Add the loaded configuration to the final config object
  results.forEach(({ key, data }) => {
    if (data) {
      config[key] = data;
    }
  });

  config[KEY] = Object.keys(urls);

  // Make the configuration available globally through the window object
  window['__config'] = config;

  // Create an instance of AppConfigService with the loaded configuration
  const appConfigService = new AppConfigService(config);

  // Create an environment provider for AppConfigService
  const provider = makeEnvironmentProviders([
    {
      provide: AppConfigService,
      useValue: appConfigService, // Register AppConfigService as a singleton
    },
  ]);

  // If options are provided, insert the config service provider at the beginning of the providers array
  options?.providers.unshift(provider);

  if (injectFacadeConfigService) {
    // Include the FacadeConfigService provider
    options?.providers.push(facadeConfigServiceProvider);
  }

  // Call each provider function, passing the AppConfigService, and register the returned providers
  providersFunction?.forEach(
    (fun) => options?.providers.push(...fun(appConfigService)) // Dynamically add new providers
  );

  // Finally, bootstrap the Angular application with the root component and the configured options
  return await boot(rootComponent, options);
}
