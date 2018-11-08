import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin-page/index';
import { HomeComponent } from './home-page/index';
import { HelpComponent } from './help-page/index';
import { LoginComponent, RegisterComponent } from './authentication-page/index';
import { AuthGuard } from './guards/index';

// определение маршрутов
const appRoutes: Routes = [

   { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent},
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
   { path: 'help', component: HelpComponent },
   { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AdminComponent, HomeComponent, LoginComponent, RegisterComponent];