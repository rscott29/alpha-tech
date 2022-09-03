import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, merge, mergeMap, Observable, skip, Subject, Subscription, switchMap, take} from "rxjs";
import {JokesService} from "../../../services/jokes/jokes.service";
import {Joke} from "../../../services/jokes/Joke";
import {NotificationService} from "../../../services/notifications/notification.service";

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.scss']
})
export class TestChildComponent implements OnInit, OnDestroy {
  jokes$!: Observable<Joke[]>;
  update$ = new Subject<void>();
  showNotification$!: Observable<boolean>;
  forceReload$ = new Subject<void>();
  gridColumns = 4;

  private initialNotificationSub!: Subscription;
  constructor(private jokesService:JokesService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    const initialJokes$ = this.getDataOnce();

    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.getDataOnce())
    );


    this.jokes$ = merge(initialJokes$, updates$);

    const reload$ = this.forceReload$.pipe(switchMap(() => this.getNotifications()));
    const initialNotifications$ = this.getNotifications();

    const show$ = merge(initialNotifications$, reload$).pipe(map( () => true));
    const hide$ = this.update$.pipe(map(() => false));
    this.showNotification$ = merge(show$, hide$);

    this.initialNotificationSub = initialNotifications$
      .subscribe(response  => {
        if (response) {
          this.notificationService.showConfirm('do you want to refresh?')
        }
      });
  }
  getDataOnce() {
    return this.jokesService.jokes.pipe(take(1));
  }
  getNotifications() {


    return this.jokesService.jokes.pipe(skip(1));
  }
  forceReload() {
    this.jokesService.forceReload();
    this.forceReload$.next();
  }
  ngOnDestroy(): void {
    this.initialNotificationSub.unsubscribe();
  }

  onReject() {
    console.log('cancel')
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
