import {Injectable, NgZone} from '@angular/core';
import {MessageService} from "primeng/api";


export interface MessagePosition {
  key: string,
  position: string
}

type topLeft = MessagePosition
type topRight = MessagePosition
type topCenter = MessagePosition

type Positions = {
  topLeft: topLeft,
  topRight: topRight,
  topCenter: topCenter
}
const availablePositions: Positions = {
  topLeft: {
    key: 'tl',
    position: 'top-left'
  },
  topRight: {
    key: 'tr',
    position: 'top-right'
  },
  topCenter: {
    key: 'tc',
    position: 'top-center'
  }
}

export const allPositions = [
  {
    ...availablePositions.topLeft
  },
  {
    ...availablePositions.topRight
  },
  {
    ...availablePositions.topCenter
  }
]


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone, private messageService: MessageService) {
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   * @param {string} position - tl, tr, tc
   */
  showSuccess(message: string, position: string): void {
    this.zone.run(() => {
      this.messageService.add({key: position, severity: 'success', summary: 'Success', detail: message})
    })
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   * @param {string} position - tl, tr, tc
   */
  showInfo(message: string, position: string): void {
    this.zone.run(() => {
      this.messageService.add({key: position, severity: 'info', summary: 'Info', detail: message})
    })
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   * @param {string} position - tl, tr, tc
   */
  showWarn(message: string, position: string): void {
    this.zone.run(() => {
      this.messageService.add({key: position, severity: 'warn', summary: 'Warn', detail: message})
    })
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   */
  showConfirm(message: string): void {
    this.zone.run(() => {
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'New Data is Available!', detail: message})
    })
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   * @param {string} position - tl, tr, tc
   */
  showCustom(message: string, position: string): void {
    this.zone.run(() => {
      this.messageService.add({key: position, severity: 'custom', summary: 'Custom', detail: message, icon: 'pi-file'})
    })
  }

  /**
   *
   * @param {string} message - message to be sent to the notification
   * @param {string} position - tl, tr, tc
   */

  showError(message: string, position: string): void {
    this.zone.run(() => {
      this.messageService.add({severity: 'error', key: position, summary: 'Error', detail: message})
    })
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }


}
