import { Injectable } from '@angular/core';
import Promise from 'promise-polyfill';

import { Storage } from '@ionic/storage';

import { ModalController } from 'ionic-angular';
import { RewardModalPage } from '../../pages/reward-modal/reward-modal';

/*
  Generated class for the RewardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardServiceProvider {

  constructor (
    private storage: Storage,
    public modalCtrl: ModalController
    ) {
    console.log('Hello RewardServiceProvider Provider');
  }

  rewards: any[] = [];

  list :any[] = [.50, .75, 1.00, 1.25, 1.50, 1.75, 2.00, .25, .50, .75];

  rewardsCheck(user, userData) {
    return new Promise((resolve, reject) => {
      userData.logins += 1

      if (userData.logins == 2) {
        let firstReward = this.rewardChance(user, userData.rewardCount);
        userData.rewardCount = firstReward;
        resolve(userData);
      }
      else if (userData.logins % 10 == 0){
        let newCount = this.rewardChance(user, userData.rewardCount);
        userData.rewardCount = newCount;
        resolve(userData);
      }
      else {
        resolve(userData);
      }
    })
  }// end rewardsCheck

  rewardChance(user, count) {
    
    if(count == 0) {
      count++;
      this.generateReward(user, count);
      return count;
    }
    else {
      let chance = Math.floor((Math.random() * 100) + 1);

      if (chance > 50) {
        count ++;
        this.generateReward(user, count);
        return count;
      }
      else {
        return count;
      }
    }

  }

  generateReward(user, count){

    let dex = Math.floor((Math.random() * 10 ))
    let rewarded = this.list[dex];

    let rewardObj = {
      rewardId: `REW-${count}`, // combine rew - count
      amount: rewarded
    }

    // if first reward this will not return any current rewards data
    // one rewards array per customer
    this.storage.get(`${user}-rewards`)
      .then( returned => {

        if(!returned) {
          
          // push reward obj into rewards array
          this.rewards.push(rewardObj);

          // storage this persons rewards data
          this.storage.set(`${user}-rewards`, this.rewards )
            //.then(res => console.log(user, `Awarded ${rewarded}`));
            .then(res => this.displayReward(rewarded));
        }
        else {
          // put rewards data into this.rewards
          this.rewards = returned;
          // add new award
          this.rewards.push(rewardObj);
          // store the updated reward array
          this.storage.set(`${user}-rewards`, this.rewards)
            //.then( res => console.log(user, `Awarded ${rewarded}`));
            .then(res => this.displayReward(rewarded));

          }


      })
  }


  displayReward(amount) {

    // first argument, page to use for the modal, reason we imported our modal
    // second argument is data passed to the modal
    let theModal = this.modalCtrl.create(RewardModalPage, { 'rewardParam' : amount});
    
    theModal.present();
  
  
  }



}// end export


