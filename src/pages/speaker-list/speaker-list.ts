import { Component } from '@angular/core';
import { Http } from '@angular/http';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { BusinessnewsProvider } from '../../providers/businessnews/businessnews';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];
  bnews: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser,
    private businessnews: BusinessnewsProvider,
    public http: Http

  ) {}

  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });

    console.log("Inside ionviewDisLoad");



    // this.http.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fcd148d3e7a44031b2f7ef24590d12f8").map(res => res.json()).subscribe((bndata: any[])=> {
    //   this.bnews = bndata;
    // });
    this.businessnews.businessnews().then((value: any[]) => {
      this.bnews =  value;

    })

  }
  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  likeNews() {
    console.log("speaker name is Liked");
  }

  dislikeNews() {
    console.log("speaker name is Disliked");



  }

  Gotourl(){
    console.log("Opening url");
  }

  // removeItem() {

  // }
}
