import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductItemsComponent} from "./product-items/product-items.component";


const routes: Routes = [
  {
    path: '',
    data: {label: 'Shopping'},
    children: [
      {
        path: 'browse',
        data: {
          label: 'Browse'
        },
        component: ProductItemsComponent
      }

    ],

  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class SettingsRoutingModule { }
