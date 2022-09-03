import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { TestChildComponent } from './test-child/test-child.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    SettingsComponent,
    TestChildComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        CardModule,
        ButtonModule,
        ToastModule,
        FlexLayoutModule
    ]
})
export class SettingsModule { }
