import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MenubarService {

  constructor(private http: HttpClient) { }

  getNodes(nodePath: string):Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(nodePath).pipe(
      map( (res) => {
        return res
      })
    )


  }
}
