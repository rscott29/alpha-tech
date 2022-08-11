import {Component, HostListener, OnInit} from '@angular/core';
import {PanelsService} from "../../panels.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-right-panel', templateUrl: './right-panel.component.html', styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  display!: Observable<boolean>

  constructor(private panelService: PanelsService) {}

  @HostListener('document:click', ['$event']) onClick(e: Event) {
    const eventTarget = e.target as HTMLInputElement
    const classNames = ['right-panel', 'pi-arrow-left']
    if (!classNames.some(className => eventTarget.classList.contains(className))) {
      this.panelService.rightPanelDeactivated()
    }
  }

  ngOnInit(): void {
    this.display = this.panelService.showRightPanel$
  }

  sidenavClosed() {
    this.panelService.rightPanelDeactivated();
  }
}
