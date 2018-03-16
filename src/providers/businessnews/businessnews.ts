// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
/*
  Generated class for the BusinessnewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusinessnewsProvider {
  bnewsuri : any = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fcd148d3e7a44031b2f7ef24590d12f8";
  data : any;

  constructor(public http: Http) {

  }

  businessnews() {

    console.log('Inside businessnews provider');
    this.http.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fcd148d3e7a44031b2f7ef24590d12f8").map(res => res.json()).subscribe(data => {
      console.log(data)
    });


    return new Promise((resolve, reject) => {


      this.http.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fcd148d3e7a44031b2f7ef24590d12f8").subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err.json());
      });
    });
  }
    load(): any {
      if (this.data) {
        return Observable.of(this.data);
      } else {
        return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fcd148d3e7a44031b2f7ef24590d12f8')
          .map(this.processData, this);
      }
    }

    processData(data: any) {
      // just some good 'ol JS fun with objects and arrays
      // build up the data by linking speakers to sessions
      this.data = data.json();

      this.data.tracks = [];

      // loop through each day in the schedule
      this.data.schedule.forEach((day: any) => {
        // loop through each timeline group in the day
        day.groups.forEach((group: any) => {
          // loop through each session in the timeline group
          group.sessions.forEach((session: any) => {
            session.speakers = [];
            if (session.speakerNames) {
              session.speakerNames.forEach((speakerName: any) => {
                let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
                if (speaker) {
                  session.speakers.push(speaker);
                  speaker.sessions = speaker.sessions || [];
                  speaker.sessions.push(session);
                }
              });
            }

            if (session.tracks) {
              session.tracks.forEach((track: any) => {
                if (this.data.tracks.indexOf(track) < 0) {
                  this.data.tracks.push(track);
                }
              });
            }
          });
        });
      });

      return this.data;
    }





}
