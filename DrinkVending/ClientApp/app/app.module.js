var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { routing, routedComponents } from './app.routing';
import { AppConfig } from './app.config';
/* App Root */
import { AppComponent } from './app.component';
import { AdminDrinkComponent, AdminCoinComponent, AdminUserComponent } from './admin-page/index';
import { HelpComponent } from './help-page/index';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { jwt } from './helpers/index';
//import './rxjs-operators';
import { AlertService, AuthenticationService, DataServiceUser, DataServiceDrink, DataServiceCoin, DataServicePurchase, UploadService } from './services/index';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map