import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG } from '@/app.config.token';
import { environment } from '../environments/environment';
import { BASE_PATH } from '@core/api/v1';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    { provide: BASE_PATH, useValue: environment.apiUrl },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
