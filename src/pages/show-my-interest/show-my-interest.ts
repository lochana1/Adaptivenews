import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import {UserData} from "../../providers/user-data";
import {NewsanduserProvider} from "../../providers/newsanduser/newsanduser";
/**
 * Generated class for the ShowMyInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-my-interest',
  templateUrl: 'show-my-interest.html',
})
export class ShowMyInterestPage {
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;
    responseData:any;
    userName:any;
    password:any;
    weights:any;
    type:any;
    learningrate : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData : UserData, private news: NewsanduserProvider) {
  }

  onModelChange(value){
    this.type = "/learning/setlearning/"+this.userName +"/"+this.password + "/" + value;
    this.news.getData(this.type).then((value: any[]) => {
        console.log(value)
    })
    .catch((err) => {
      console.log("Error in getting weights data:")
      console.log(err);
    });
  }

  ionViewDidLoad() {

     this.userData.getUsername().then((id)=> {
      this.userName = id;
      this.userData.getpwd().then((id)=> {
        this.password = id;
        this.type = "/learning/userweights/"+this.userName +"/"+this.password;
        console.log(this.type)
        this.news.getData(this.type).then((value: any[]) => {
          this.weights = value[0];
          console.log(this.weights);
          this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["Sports", "Business", "Entertainment", "Politics", "Technology"],
                datasets: [{
                    label: '# of Interest',
                    data: [this.weights.sports, this.weights.business, this.weights.entertainment, this.weights.politics, this.weights.technology],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
          });

          this.type = "/learning/getlearning/"+this.userName +"/"+this.password;
          this.news.getData(this.type).then((value: any[]) => {
              console.log(value);
              this.learningrate = value;
          })
        })
        .catch((err) => {
          console.log("Error in getting weights data:")
          console.log(err);
        });
      });
    });
    }


}
