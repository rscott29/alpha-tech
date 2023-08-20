import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {PanelsService} from "../../panels.service";


@Component({
  selector: 'app-sidenav', templateUrl: './sidenav.component.html', styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {
  display: boolean = true;
  sideNavActive!: boolean;
  menuItems!: NodeListOf<Element>
  chevronIcons!: HTMLElement[]
  @ViewChild('sideMenu') sideMenu!: Sidebar

  constructor(private panelsService: PanelsService) {}


  sideNavItems = [{
    label: 'Dashboard', icon: 'pi pi-chart-line',
    routerLink: ["/dashboard"],
  },
    {
      label: 'Shopping', icon: 'pi pi-shopping-bag', routerLink: ['/shopping'], items: [{
        label: 'Browse', icon: 'pi pi-list', routerLink: ['shopping/browse']
      }],
    }
  ];

  ngAfterViewInit(): void {
    this.chevronIcons = this.sideMenu.el.nativeElement.querySelectorAll('.pi-chevron-right, .pi-chevron-down')

  }

  showText() {
    this.panelsService.leftPanelActivated()
    this.sideNavActive = true;
    this.menuItems = this.sideMenu.el.nativeElement.querySelectorAll('.p-menuitem-text')
    this.chevronIcons.forEach((icon) => {
      icon.style.display = 'inline-flex'
    })
    if (this.sideNavActive) {
      this.menuItems.forEach((item) => item.classList.add('show-text'))
    }
  }

  hideText() {
    this.panelsService.leftPanelDeactivated()
    this.sideNavActive = false;
    this.chevronIcons.forEach((icon: { style: { display: string; }; }) => {
      icon.style.display = 'none';
    })
    if (!this.sideNavActive) {
      this.menuItems.forEach((item) => item.classList.remove('show-text'));
    }
  }

}
