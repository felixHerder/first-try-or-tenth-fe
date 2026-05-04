import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);

  handleError(error: any) {
    this.zone.run(() => {
      const message = error.message || 'An unexpected error occurred!';
      console.error('Global Error caught: ', error);
    });
  }
}
