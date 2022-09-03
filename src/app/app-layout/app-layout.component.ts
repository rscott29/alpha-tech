import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../services/notifications/notification.service";

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  onConfirm() {
    this.notificationService.onConfirm()
  }

  onReject() {
    this.notificationService.onReject();
  }
}
