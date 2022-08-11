import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {PanelsService} from "../../panels.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-sidenav', templateUrl: './sidenav.component.html', styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit, OnDestroy {
  display: boolean = true;
  sideNavActive!: boolean;
  menuItems!: NodeListOf<Element>
  chevronIcons!: HTMLElement[]
  @ViewChild('sideMenu') sideMenu!: Sidebar
  @ViewChild('pinElement')
  private pinElement!: ElementRef;
  globalInstance: any;
  leftPanelActive! :Observable<boolean>;
  private pinHovered: boolean = false;

  constructor(private panelsService: PanelsService, private renderer: Renderer2) {
    this.leftPanelActive = this.panelsService.showLeftPanel$

  }


  sideNavItems = [{
    label: 'Dashboard', icon: 'pi pi-chart-line',
    routerLink: ["/dashboard"],
  },
    {
      label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'], items: [{
        label: 'Test Page', icon: 'pi pi-upload', routerLink: ['settings/test']
      }],
    }
  ];

  ngAfterViewInit(): void {
    this.chevronIcons = this.sideMenu.el.nativeElement.querySelectorAll('.pi-chevron-right, .pi-chevron-down')
    this.globalInstance = this.renderer.listen(this.pinElement.nativeElement, 'mouseover', () => {
      console.log('hovering over pin')
      this.pinHovered = true
        this.showText()
    });
  }

  showText() {

    this.sideNavActive = true;
    console.log(this.sideNavActive)
    this.panelsService.leftPanelActivated();
    this.menuItems = this.sideMenu.el.nativeElement.querySelectorAll('.p-menuitem-text')
    this.chevronIcons.forEach((icon) => {
      icon.style.display = 'inline-flex'
    })
    if (this.sideNavActive) {
      this.menuItems.forEach((item) => item.classList.add('show-text'))
    }
  }

  hideText() {
    this.sideNavActive = false;
    this.panelsService.leftPanelDeactivated()
    this.chevronIcons.forEach((icon: { style: { display: string; }; }) => {
      icon.style.display = 'none';
    })
    if (!this.sideNavActive && !this.pinHovered) {
      console.log(this.sideNavActive)
      this.menuItems.forEach((item) => item.classList.remove('show-text'));
    }
  }
  ngOnDestroy(): void {
    this.globalInstance();
  }
}
