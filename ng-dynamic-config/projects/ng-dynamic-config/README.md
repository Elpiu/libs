# Application Configuration Library

The `ng-dynamic-config` library is an Angular utility designed to streamline the process of bootstrapping an Angular application with dynamic configuration data. It allows you to fetch configuration files from specified URLs, manage them using a service, and dynamically register additional providers based on the loaded configuration.

## Features

- **Dynamic Configuration Loading**: Load configuration data from multiple sources before bootstrapping your application.
- **Provider Management**: Register additional providers dynamically based on the loaded configuration.
- **Type Safety**: Ensure type safety when retrieving configuration data with the `AppConfigService`.

---

# Getting Started with ng-dynamic-config

Follow these steps to set up and use the `ng-dynamic-config` library in your Angular application.

## Step 1: Import Required Modules

In your `main.ts` or `bootstrap.ts`, import the necessary modules:

```typescript
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
// Make sure of this path
import { bootstrapApplication } from "ng-dynamic-config";
```

## Step 2: Define Configuration Keys

export const simpleConfigKey = 'SIMPLE';

## Step 3: Specify the Configuration File

// Path to your configuration file (Remote or Local)
const configJson = 'testConfig.json';

Configuration JSON Example

Ensure your JSON file, testConfig.json, is structured as follows:

```json
{
  "name": "Elpidio Mazza"
}
```

## Step 4: Bootstrap the Application

```ts
bootstrapApplication(
  {
    [simpleConfigKey]: configJson, // Map your config keys to the respective JSON file
  },
  {}, // Default configuration values
  AppComponent, // Your root component
  true, // Inject FacadeConfigService
  appConfig // Additional application configuration
);
```

## Step 5: Access Configuration Data in a Component

In your component (e.g., AppComponent), you can access the configuration data using the FacadeConfigService:

```ts
import { Component } from "@angular/core";
import { FacadeConfigService } from "./facade-config.service"; // Adjust the import path

export class AppComponent {
  title: string;

  constructor(private facade: FacadeConfigService) {
    this.title = facade.getConfig<{ name: string }>(simpleConfigKey).name; // Access the name from your configuration
  }
}
```

## Conclusion

You have now set up the ng-dynamic-config library in your Angular application and can access configuration data dynamically. For further customization and advanced usage, refer to the library documentation.

### Notes:

- Make sure to adjust the import paths based on your project's structure.
- You can add more details or examples if necessary, depending on the complexity of your application and configuration needs.
