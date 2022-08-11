import {Component, OnInit} from '@angular/core';
import {MenubarService} from "./menubar.service";
import {Observable} from "rxjs";
import {MenuItem} from "primeng/api";
import {environment} from "../../../environments/environment";
import {PanelsService} from "../../panels.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})

export class MenubarComponent implements OnInit {

  menuItems$!: Observable<MenuItem[]> ;
  profileItems!:  MenuItem[];
  searchString!: string;



  constructor(private menuBarService: MenubarService, private panelsService:PanelsService) {}

  ngOnInit(): void {
    this.menuItems$ = this.menuBarService.getNodes(environment.menuItemsPath);
    this.profileItems = [       {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
      {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}]


  }


  showRightPanel(){

    this.panelsService.rightPanelActivated()


  }}
