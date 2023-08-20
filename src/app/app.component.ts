import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {PrimeNGConfig} from "primeng/api";
import {allPositions, NotificationService} from "./services/notifications/notification.service";
import {RxStompService} from "./rx-stomp.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-proj';
  allPositions = allPositions


  constructor(private http: HttpClient, private notificationService: NotificationService, private primengConfig: PrimeNGConfig) {

    this.primengConfig.ripple = true;


  }


  throwError() {
    throw new Error('App Component: My Pretty Error');
  }

  throwHttpError() {
    this.http.get('urlhere').subscribe();
  }

  ngOnInit(): void {

  }




  success() {
    this.notificationService.showSuccess('good job', 'tl')
  }

  info() {
    this.notificationService.showInfo('good info', 'tr')
  }

  confirm() {
    this.notificationService.showConfirm('foo be doo');
  }

  warn() {
    this.notificationService.showWarn('warning', 'tc')
  }

  custom() {
    this.notificationService.showCustom('custom foo', 'tc')
  }



}

