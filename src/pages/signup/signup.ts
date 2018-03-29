import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

// import { TabsPage } from '../tabs-page/tabs-page';
import { NewsanduserProvider } from '../../providers/newsanduser/newsanduser';
import {SpeakerListPage} from "../speaker-list/speaker-list";


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '', age: '', gender: '' };
  responseData: any;

  submitted = false;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public auth : NewsanduserProvider) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    console.log("form data", form);

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.userData.setpwd(this.signup.password);

      let type: any = "/signup/" + this.signup.username + "/" + this.signup.password + "/" + this.signup.age + "/" + this.signup.gender;



      this.auth
        .postData(type)
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

    }
  }
}
