import { Component } from '@angular/core';

import { User } from '../models/index';

@Component({
     selector: 'app-admin',
    templateUrl: './admin.page.component.html'
})
export class AdminComponent {

    modeState: boolean =true;
  currentUser: User;


    constructor() {
       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        
    }
    changeModeState() { this.modeState = !this.modeState;}
   
}
