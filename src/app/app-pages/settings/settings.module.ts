import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { TestChildComponent } from './test-child/test-child.component';
import {SettingsRoutingModule} from "./settings-routing.module";



@NgModule({
  declarations: [
    SettingsComponent,
    TestChildComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
