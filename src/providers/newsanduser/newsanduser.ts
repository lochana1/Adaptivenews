// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import {Observable} from "rxjs/Observable";
/*
  Generated class for the NewsanduserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsanduserProvider {
  apiURL : any = "http://52.211.224.36:8080";
  // bnewsuri : any = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=fcd148d3e7a44031b2f7ef24590d12f8";
  data : any;

  constructor(public http: Http) {

  }

  getData(type) {


    console.log('Inside newsanduser provider');
    // let headers = new Headers();
    // let options = new ({ headers:headers});
    // let obj: any ={};
    // headers.append("Dummy", "Dummy");

    this.http.get(this.apiURL+type ).map(res=>res.json()).subscribe(data => {

      console.log(data);
    });

    return new Promise((resolve, reject) => {

      this.http.get(this.apiURL+type ).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err.json());
      });
    });
  }



  postData(type){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append("dummy", "dummy");
      this.http.post(this.apiURL+type,{headers}).subscribe(res =>{
        resolve(res.json());

      }, (err)=> {

        reject(err.json());
      });
    });
  }





}
