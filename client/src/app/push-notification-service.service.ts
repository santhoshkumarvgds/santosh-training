
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
const SERVER_URL = 'http://localhost:4000/';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationServiceService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription);
  }
  // readonly VAPID_PUBLIC_KEY =
  //   'BMqhOMOQL-czyJHbqhqotbLY_d9tCl-_aTwichBu0UOtZEotHPgvLPebxe0FjLRPKZniOzNwvwQWo5S3kCZnkYI';
  // private baseUrl = 'http://localhost:4000/';

  // constructor(private http: HttpClient, private swPush: SwPush) {}
  // subscribeToNotification() {
  //   this.swPush
  //     .requestSubscription({
  //       serverPublicKey: this.VAPID_PUBLIC_KEY,
  //     })
  //     .then((sub) => this.sendToServer(sub))
  //     .catch((err) =>
  //       console.error('Could not subscribe to notifications', err)
  //     );
  // }
  // sendToServer(params: any) {
  //   this.http.post(this.baseUrl, { notification: params }).subscribe();
  // }
}
