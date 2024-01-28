import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";
import 'zone.js';
import { register as registerSwiperElements } from 'swiper/element/bundle';

// Register Swiper custom elements. We do this
// before bootstrapping the Angular application
// so that they're available before any part of
// our application tries rendering them.
registerSwiperElements();

bootstrapApplication(AppComponent, {
 ...appConfig,
 providers: [provideHttpClient(), ...(appConfig.providers || [])],
}).catch((err) => console.error(err));
