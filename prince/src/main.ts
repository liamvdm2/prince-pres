import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";
import 'zone.js';

bootstrapApplication(AppComponent, {
 ...appConfig,
 providers: [provideHttpClient(), ...(appConfig.providers || [])],
}).catch((err) => console.error(err));
