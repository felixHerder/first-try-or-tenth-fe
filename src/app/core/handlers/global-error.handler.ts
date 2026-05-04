import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);
  private notification = inject(NzNotificationService);

  handleError(error: any) {
    this.zone.run(() => {
      const message = error.message || 'An unexpected error occurred!';
      console.error('Global Error caught: ', error);
      this.notification.error('Error', message);
    });
  }
}
