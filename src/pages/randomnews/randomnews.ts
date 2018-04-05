import { Component } from '@angular/core';
import { Http } from '@angular/http';

import {
  IonicPage,
  ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ConferenceData } from '../../providers/conference-data';
import { NewsanduserProvider } from '../../providers/newsanduser/newsanduser';
import {UserData} from "../../providers/user-data";

@IonicPage()
@Component({
  selector: 'page-randomnews',
  templateUrl: 'randomnews.html',
})
export class RandomnewsPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];
  bnews: any[] = [];
  responseData:any;
  userName:any;
  password:any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    private news: NewsanduserProvider,
    public http: Http,
    public userData : UserData,
    private iab: InAppBrowser
  ) {}

  openUrl(news) {
    const browser = this.iab.create(news.url);
    browser.show()
  }

  ionViewDidLoad() {
    console.log("Inside ionviewDisLoad");
    this.userData.getUsername().then((id)=> {
      this.userName = id;
      console.log("username: ", this.userName);
      this.userData.getpwd().then((id)=> {
        this.password = id;
        console.log("password: ", this.password);
        let type:any = "/news"
          this.news.getData(type).then((value: any[]) => {
          this.bnews = value;
        })
        .catch((err) => {
          console.log("Error in getting getting news data:")
          console.log(err);
        });
      });
    });
  }

  disableButton:any;
  likeNews(news) {
    let type:any = "/learning/like/"+this.userName +"/"+this.password+"/"+ news.Category;
    console.log("Sending like", type);
    this.news
      .getData(type)
      .then(
        (result) => {
          this.responseData = result;
          console.log(this.responseData);
          let index = this.bnews.indexOf(news);
          if(index > -1){
            this.bnews.splice(index, 1);
          }
        })
      .catch((err) => {
        console.log("Error in liking up:")
        console.log(err);
      });
    console.log("speaker name is Liked");
  }

  dislikeNews(news) {
    let type:any = "/learning/dislike/"+this.userName +"/"+this.password+"/"+ news.Category;
    console.log("Sending Dislike", type);
    this.news
      .getData(type)
      .then(
        (result) => {
          this.responseData = result;
          console.log(this.responseData);
          let index = this.bnews.indexOf(news);
          if(index > -1){
            this.bnews.splice(index, 1);
          }       
        })
      .catch((err) => {
        console.log("Error in liking up:")
        console.log(err);
      });
    console.log("speaker name is Disliked");

  }
  Gotourl(){
    console.log("Opening url");

    console.log("speaker name is")
  }

}
