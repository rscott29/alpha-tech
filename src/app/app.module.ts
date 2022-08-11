import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {AppLayoutModule} from "./app-layout/app-layout.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, AppLayoutComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    AppLayoutModule
  ],
  providers: [],
  exports: [AppLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
