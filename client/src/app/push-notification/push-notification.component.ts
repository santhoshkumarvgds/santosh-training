import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationServiceService } from '../push-notification-service.service';
const VAPID_PUBLIC =
  'BBgYPAktrx1gTQBzaiLFVk9vyw70nDPuTBqbYJ-42p5sOL_2hnRlEH7xai78d1BdddlXncQXIkszcu5dSMj8ww4';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css'],
})
export class PushNotificationComponent implements OnInit {
  // isEnabled = this.swPush.isEnabled;
  constructor(
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    pushService: PushNotificationServiceService
  ) {
    alert(swPush.isEnabled);
    // if (!swPush.isEnabled) {
    //   alert('success');
    //   swPush
    //     .requestSubscription({
    //       serverPublicKey: VAPID_PUBLIC,
    //     })
    //     .then((subscription) => {
    //       pushService.sendSubscriptionToTheServer(subscription).subscribe();
    //     })
    //     .catch(console.error);
    // }
  }

  ngOnInit(): void {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available.subscribe(() => {
    //     this.swUpdate.activateUpdate().then(() => {
    //       window.location.reload();
    //     });
    //   });
    // }
  }
  // ngOnInit(): void { }

  // isEnabled = this.swPush.isEnabled;
  // isGranted = Notification.permission === 'granted';
  // constructor(
  //   private swPush: SwPush,
  //   private webNotificationService: PushNotificationServiceService
  // ) {}
  // submitNotification(): void {
  //   this.webNotificationService.subscribeToNotification();
  // }
}
