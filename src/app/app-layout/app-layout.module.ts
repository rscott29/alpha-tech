import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import { SearchComponent } from './search/search.component';
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import { SidenavComponent } from './sidenav/sidenav.component';
import {SidebarModule} from "primeng/sidebar";
import { FooterComponent } from './footer/footer.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {PanelMenuModule} from "primeng/panelmenu";
import {RadioButtonModule} from "primeng/radiobutton";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    MenubarComponent,
    SearchComponent,
    SidenavComponent,
    FooterComponent,
    RightPanelComponent,
    BreadcrumbComponent,

  ],
  exports: [
    MenubarComponent,
    SearchComponent,
    SidenavComponent,
    FooterComponent,
    RightPanelComponent,
    BreadcrumbComponent
  ],
    imports: [
        CommonModule,
        MenubarModule,
        AvatarModule,
        ButtonModule,
        MenuModule,
        RippleModule,
        InputTextModule,
        FormsModule,
        SidebarModule,
        BreadcrumbModule,
        PanelMenuModule,
        RadioButtonModule,
        ToolbarModule,
    ]
})
export class AppLayoutModule { }
