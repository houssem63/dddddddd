import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpInterceptorService } from './services/interceptors/http.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  provideAnimations(), // required animations providers
  provideToastr() ,  importProvidersFrom(BrowserAnimationsModule)
    , provideAnimationsAsync(),provideHttpClient(withFetch(),withInterceptors([HttpInterceptorService])),provideAnimations(),]
};
