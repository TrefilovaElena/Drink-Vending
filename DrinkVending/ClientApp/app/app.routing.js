import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin-page/index';
import { HomeComponent } from './home-page/index';
import { HelpComponent } from './help-page/index';
import { LoginComponent, RegisterComponent } from './authentication-page/index';
import { AuthGuard } from './guards/index';
// ����������� ���������
var appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'help', component: HelpComponent },
    { path: '**', redirectTo: '' }
];
export var routing = RouterModule.forRoot(appRoutes);
export var routedComponents = [AdminComponent, HomeComponent, LoginComponent, RegisterComponent];
//# sourceMappingURL=app.routing.js.map