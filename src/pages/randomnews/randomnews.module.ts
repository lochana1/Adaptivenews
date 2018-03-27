import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomnewsPage } from './randomnews';

@NgModule({
  declarations: [
    RandomnewsPage,
  ],
  imports: [
    IonicPageModule.forChild(RandomnewsPage),
  ],
})
export class RandomnewsPageModule {}
