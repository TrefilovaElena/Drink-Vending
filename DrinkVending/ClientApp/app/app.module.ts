import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { routing, routedComponents } from './app.routing';
import { AppConfig } from './app.config';

/* App Root */
import { AppComponent } from './app.component';
import { AdminComponent, AdminDrinkComponent, AdminCoinComponent, AdminUserComponent} from './admin-page/index';
import { HomeComponent } from './home-page/index';
import { HelpComponent } from './help-page/index';
import { LoginComponent } from './authentication-page/index';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { jwt } from './helpers/index';



//import './rxjs-operators';

import {
    AlertService,
    AuthenticationService,
    DataServiceUser,
    DataServiceDrink,
    DataServiceCoin,
    DataServicePurchase,
    UploadService
} from './services/index';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AdminDrinkComponent,
        HelpComponent,
        AdminCoinComponent,
        AdminUserComponent,
        AlertComponent,
        routedComponents
    ],
    providers: [
        AlertService,
        AppConfig,
        AuthGuard,
        jwt,
        AuthenticationService,
        DataServiceUser,
        DataServiceDrink,
        DataServiceCoin,
        DataServicePurchase,
        UploadService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }