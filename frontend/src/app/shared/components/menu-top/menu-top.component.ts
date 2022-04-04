import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Notifications } from '../../models/notifications';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, protected notification: NotificationService,) {
    this.username = authService.getUsername;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.notification.success(Notifications.logoutSucess)
  }
}
