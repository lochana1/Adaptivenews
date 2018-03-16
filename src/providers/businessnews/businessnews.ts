// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BusinessnewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusinessnewsProvider {

  constructor() {

  }

  businessnews(){
    console.log('Hello BusinessnewsProvider Provider');
  }

}
