import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, DataServiceUser } from '../services/index';

@Component({
   // moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};

    constructor(
        private router: Router,
        private userService: DataServiceUser,
        private alertService: AlertService) { }

    register() {
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Пользователь зарегистрирован.', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error._body);
                });
    }
}
