import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";

import {NGXLogger} from "ngx-logger";
import {NotificationService} from "../notifications/notification.service";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse): void {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(NGXLogger);
    const notifier = this.injector.get(NotificationService)

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerErrorMessage(error)

      notifier.showError(message, 'tl')
    } else {
      message = errorService.getClientErrorMessage(error)
      notifier.showError(message, 'tc')
    }

    logger.error(message);
  }
}
