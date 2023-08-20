import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {map, merge, mergeMap, Observable, skip, Subject, Subscription, switchMap, take} from "rxjs";
import {FilterValues, ProductService} from "../../../services/products/product.service";
import {Product} from "../../../services/products/Product";
import {NotificationService} from "../../../services/notifications/notification.service";
import {RxStompService} from "../../../rx-stomp.service";
import {MenuItem} from "primeng/api";
import {CurrencyPipe, TitleCasePipe} from "@angular/common";
import {MultiSelect} from "primeng/multiselect";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss'],
  providers: [TitleCasePipe, CurrencyPipe]
})
export class ProductItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  public products$!: Observable<Product[]>;
  public averageRating!: number[];
  public averageRatingFilter!: number[];
  public categories!: string[]
  public selectedProducts!: FilterValues;
  public distinctCategories!: Observable<MenuItem[]>;
  private update$ = new Subject<void>();
  private showNotification$!: Observable<boolean>;
  private forceReload$ = new Subject<void>();
  private webSocketNotificationSub!: Subscription;
  private averageRatingSub!: Subscription;
  @ViewChildren('productCard') productCards!: QueryList<ElementRef>
  @ViewChild(MultiSelect) ms!: MultiSelect;
  rangeValues!: number[];
  private prices!: number[];
  public min!: number;
  public max!: number;
  filterForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private rxStompService: RxStompService,
    private titleCasePipe: TitleCasePipe,
    private  fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    const initialProducts$ = this.getDataOnce();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.getDataOnce())
    );
    // this.averageRatingSub = this.productService.products.subscribe(res => {
    //   this.averageRating = res.flatMap(product => product.averageRating)
    //   this.prices = res.map(prod => prod.price)
    //   // rounded to the lowest 5th
    //   this.min = parseInt(String(Math.min(...this.prices) / 5), 10) * 5;
    //   // rounded to the highest 5th
    //   this.max = Math.ceil(Math.max(...this.prices) / 5) * 5
    //   this.rangeValues = [
    //     this.min,
    //     this.max]
    // })





    this.products$ = merge(initialProducts$, updates$);
    this.getDataOnce().subscribe((products: Product[]) => {
      const productList = products.map(product => {
          return product;
        })
      this.categories = productList.map(x => x.category)
      console.log(productList)
      this.createForm()
        // const categories = products.map(r => r.category);
        // const menuItems = [] as MenuItem[]
        // categories.map(category => {
        //   let titleCasedCategories = this.titleCasePipe.transform(category)
        //   menuItems.push({label: titleCasedCategories})
        // })
        // const uniqueCategories = new Map();
        // menuItems.forEach(product => uniqueCategories.set(product.label, product));
        // this.categories = [...uniqueCategories.values()];
      })

    const reload$ = this.forceReload$.pipe(switchMap(() => this.getNotifications()));
    const initialNotifications$ = this.getNotifications();
    const show$ = merge(initialNotifications$, reload$).pipe(map(() => true));
    const hide$ = this.update$.pipe(map(() => false));
    this.showNotification$ = merge(show$, hide$);

    this.webSocketNotificationSub = this.rxStompService.watch('/topic/notifications').subscribe(() => {
      this.notificationService.showConfirm('do you want to refresh?')
    })

  }
  ngAfterViewInit(): void {
    const initialProducts$ = this.getDataOnce();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.getDataOnce()),
    );
    const originalRemoveChip = this.ms.removeChip;
    this.ms.removeChip = (...args) => {
      originalRemoveChip.apply(this.ms, args);
      this.ms.onModelChange(this.ms.value);
      this.ms.onChange.emit({originalEvent: null, value: this.ms.value});
     this.products$ = merge(initialProducts$, updates$);
      this.forceReload()
    }
  }
  getDataOnce() {
    return this.productService.products.pipe(take(1));
  }

  getNotifications() {
    return this.productService.products.pipe(skip(1));
  }

  forceReload() {
    this.productService.forceReload();
    this.forceReload$.next();
    this.notificationService.clearNotification();
  }

  ngOnDestroy(): void {
    this.webSocketNotificationSub.unsubscribe();
    this.averageRatingSub.unsubscribe();
  }

  onReject() {
    this.notificationService.clearNotification();
  }

  filter(event: any, menuItem: string) {
    this.productService.filter(event, menuItem)
    this.forceReload();
  }

  private createForm() {
    this.filterForm = this.fb.group({
      category: [this.selectedProducts.category],
      priceRange: [this.selectedProducts.priceRange],
      averageReview: [this.selectedProducts.averageReview]
    });

  }
  onSubmit() {
    console.log(this.filterForm.value);
  }
}
