import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RatingModule} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccordionModule} from "primeng/accordion";
import {MenuModule} from "primeng/menu";
import {MultiSelectModule} from "primeng/multiselect";
import {SliderModule} from "primeng/slider";



@NgModule({
  declarations: [
    SettingsComponent,
    ProductItemsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CardModule,
    ButtonModule,
    ToastModule,
    FlexLayoutModule,
    RatingModule,
    FormsModule,
    AccordionModule,
    MenuModule,
    MultiSelectModule,
    SliderModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
