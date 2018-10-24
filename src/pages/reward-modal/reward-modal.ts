import { Component } from '@angular/core';

// added ViewController
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the RewardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward-modal',
  templateUrl: 'reward-modal.html',
})
export class RewardModalPage {

  displayparam: number;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
      this.displayparam = navParams.get('rewardParam');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
