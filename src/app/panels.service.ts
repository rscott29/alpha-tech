import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PanelsService {

  private readonly _showRightPanel: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly showRightPanel$ = this._showRightPanel.asObservable();

  private readonly _showLeftPanel: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly showLeftPanel$ = this._showLeftPanel.asObservable();

  get rightPanelActive(): boolean {
    return this._showRightPanel.getValue();
  }

  get leftPanelActive(): boolean {
    return this._showLeftPanel.getValue();
  }

  private set showLeftPanel(val: boolean) {
    this._showLeftPanel.next(val);
  }

  private set showRightPanel(val: boolean) {
    this._showRightPanel.next(val);
  }

  rightPanelActivated() {
    this.showRightPanel = true
    return this.showRightPanel
  }
  rightPanelDeactivated() {
    this.showRightPanel = false
    return this.showRightPanel
  }
  leftPanelActivated() {
    this.showLeftPanel = true
    return this.showLeftPanel
  }
  leftPanelDeactivated() {
    this.showLeftPanel = false
    return this.showLeftPanel
  }
}
