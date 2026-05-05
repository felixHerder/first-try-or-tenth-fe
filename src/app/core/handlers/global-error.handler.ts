import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);
  private notification = inject(NzNotificationService);

  handleError(error: any) {
    this.zone
      .run(async () => {
        console.error('Global Error caught: ', error);
        //handle api status 400 bad requests
        try {
          const parsedMsg = await JSON.parse(error.message);
          const errorMessages = Object.values(parsedMsg?.errors || {}) as string[];
          const message = parsedMsg.message;
          errorMessages.forEach((msg) => {
            this.notification.error('Error', msg);
          });
          this.notification.error('Error', message);
        } catch {
          this.notification.error('Error', error.message);
        }
      })
      .then();
  }
}
