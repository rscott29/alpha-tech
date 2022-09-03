import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {AppLayoutModule} from "./app-layout/app-layout.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {LoggerModule, NgxLoggerLevel, TOKEN_LOGGER_WRITER_SERVICE} from "ngx-logger";
import {MyLoggerWriterService} from "./services/logging/LoggerWriter";
import {GlobalErrorHandler} from "./services/error/global-error-handler";
import {ServerErrorInterceptor} from "./interceptors/server-error.interceptor";
import {ButtonModule} from "primeng/button";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [AppComponent, AppLayoutComponent],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        AppLayoutModule,
        ToastModule,
        ButtonModule,
        LoggerModule.forRoot({
            //    serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR,
            enableSourceMaps: true
        }, {
            writerProvider: {provide: TOKEN_LOGGER_WRITER_SERVICE, useClass: MyLoggerWriterService}
        }),
        FlexModule,
    ],
  providers: [
    MessageService,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true}
  ],
  exports: [AppLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule {


}
