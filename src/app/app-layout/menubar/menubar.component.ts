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





  constructor(private panelsService:PanelsService) {}

  ngOnInit(): void {


  }


  showRightPanel(){

    this.panelsService.rightPanelActivated()


  }}
