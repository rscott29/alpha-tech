import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error) {
    return error.message ?
           error.message :
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse) {
    return navigator.onLine ?
            error.message :
            'No Internet Connection'
  }
}
