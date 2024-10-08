import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  menuData = [
    { title: 'Our Menu', pic:'assets/imgs/soup1.jpg', pushPage: 'MenuPage'},
    { title: 'Account', pic: 'assets/imgs/coffee-people3.jpg', pushPage: 'AccountPage'},
    { title: 'About Us', pic: 'assets/imgs/coffee6.jpg', pushPage: 'AboutPage'},
    { title: 'Locations', pic: 'assets/imgs/cafe2.jpg', pushPage: 'LocationsPage' }
  ];

  logPage: any
  loggedIn: any;
  
  constructor(
    public navCtrl: NavController, 
    private afAuth: AngularFireAuth,
    public userService: UserServiceProvider ) 
  { 

  }

  ngOnInit(){

    this.logPage = 'LoginPage';

    this.afAuth.auth.onAuthStateChanged ( user => {
      if(user) {
        this.loggedIn = this.userService.user = user.email;
      }
    })
  }

  signOff(){
    this.userService.logOut();
    this.loggedIn = '';
  }

  myPagePush(page) {
    this.navCtrl.push(page)
    .then(result => { 
      if(result){
        window.alert('hi' + result);
      }

      // if(!result) {
      //   console.log('Result of navCtrl push ' + result);
      //   this.userService.displayAlert('Sorry','You must first register an account');
      // } 
    })  
  }

}
