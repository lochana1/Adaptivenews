import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NewsanduserProvider} from "../../providers/newsanduser/newsanduser";
import {Http} from "@angular/http";
import {UserData} from "../../providers/user-data";


/**
 * Generated class for the UseradaptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-useradapt',
  templateUrl: 'useradapt.html',
})
export class UseradaptPage {

  responseData:any;
  userName:any;
  password:any;
  weights:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private news: NewsanduserProvider,
              public http: Http,
              public userData : UserData) {


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad UseradaptPage');
    this.userData.getUsername().then((id)=> {
      this.userName = id;

    });
    console.log("username: ", this.userName);

    this.userData.getpwd().then((id)=> {
      this.password = id;

    });
    console.log("password: ", this.password);
    // let type:any = "/learning/userweights/"+this.userName +"/"+this.password+"/";
    let type:any = "/learning/userweights/cl1/cl1";
      // http://52.211.224.36:8080/learning/userweights/<username>/<userpassword>
    console.log("Weights url sent:", type);

    this.news.getData(type).then((value: any[]) => {
      this.weights = value;

    })
      .catch((err) => {
        console.log("Error in getting weights data:")
        console.log(err);
      });
    console.log("weights",this.weights);
    // console.log("weights1",this.weights[0][0]);
    // console.log("weights2",this.weights[0][1]);

  }

}
