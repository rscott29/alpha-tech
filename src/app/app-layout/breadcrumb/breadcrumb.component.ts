import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'App';
  readonly home = {icon: 'pi pi-home', url: 'home'};
  menuItems!: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }
  private createBreadcrumbs(route: ActivatedRoute, routerLink: string = '', breadcrumbs: MenuItem[] = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        routerLink += `/${routeURL}`
      }

      const label = child.snapshot.data['label'];
       if(routerLink && label) {
         breadcrumbs.push({label, routerLink});
       }

      return this.createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }
}
