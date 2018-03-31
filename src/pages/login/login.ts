import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

// import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import {UserLogin} from "../../interfaces/user-login";
import { NewsanduserProvider } from '../../providers/newsanduser/newsanduser';
import {SpeakerListPage} from "../speaker-list/speaker-list";


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserLogin = { username: '', password: '' };
  submitted = false;
  responseData: any;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public auth :NewsanduserProvider) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    let type: any = "/login/" + this.login.username + "/" + this.login.password;
    if (form.valid) {

      this.userData.login(this.login.username);
      this.userData.setpwd(this.login.password);
      this.auth
        .getData(type)
        .then(
          (result) => {
            this.responseData = result;
            console.log(this.responseData);
            this.navCtrl.setRoot(SpeakerListPage);

          })
        .catch((err) => {
          console.log("Error in signing up:")
          console.log(err);
        });



      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
