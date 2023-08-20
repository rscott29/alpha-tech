import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay, Subject, take, takeUntil, tap} from "rxjs";
import {HttpClient, HttpParameterCodec, HttpParams} from "@angular/common/http";
import {Product, ProductResponse} from "./Product";
import {NotificationService} from "../notifications/notification.service";
import {FilterQuery} from "../../utility/FilterQueries";
import {FilterOperation} from "../../utility/FilterOperations";



const API_ENDPOINT = 'http://localhost:8080/api/products';
const CACHE_SIZE = 1

export interface FilterValues {
  category: string[],
  priceRange?: number[],
  averageReview?: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private cache$!: Observable<Array<Product>> | null;
  private reload$ = new Subject<void>();
  public selectedValues = new BehaviorSubject<FilterValues>({averageReview: 0, category: [], priceRange: []})



  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
  }

  get products(): Observable<Product[]> {
    if (!this.cache$) {
      this.cache$ = this.requestProducts().pipe(
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      )
    }
    return this.cache$;
  }


  public forceReload() {
    this.reload$.next();
    this.cache$ = null;
  }



  public setSelectedValues(values: FilterValues) {
    this.selectedValues.next({ category: ['clothing']});
  }

  public getSelectedValues() {
    return this.selectedValues.getValue();
  }

  public filter(event: any, val: any){
     const selectedItems = {}
    this.setSelectedValues(val)
  }

  private requestProducts(): Observable<Product[]> {
    this.forceReload()

    return this.httpClient.get<ProductResponse>(API_ENDPOINT, {params: this.buildParams(this.getSelectedValues())}).pipe(
      map((response) => response.items));
  }

  private buildParams(params: any) {
    let httpParams = new HttpParams();

    let keys = Object.keys(params);

    keys.forEach(key => {
      if (params[key] !== null ) {

      //TODO: if items are selected set params dynamically as below, otherwise they need to be blank but still valid

      //httpParams = httpParams.set(FilterQuery.FilterAnd.value, 'category|' + FilterOperation.Equals.value + '|electronics')


      }
    });



    return httpParams

  }







}

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
