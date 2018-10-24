import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';

import { IonicStorageModule } from '@ionic/storage';
import { RewardServiceProvider } from '../providers/reward-service/reward-service';

// importing module that was generated, not the modal itself
// different mechanism than navigating to another page
import { RewardModalPageModule } from '../pages/reward-modal/reward-modal.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyA-6PH8ZFKJlLjX3SZlcdUP_2veBlz38Ko',
  authDomain: 'wired-coffee-d92e5.firebaseapp.com',
  databaseURL: 'https://wired-coffee-d92e5.firebaseio.com',
  storageBucket: 'wired-coffee-d92e5.appspot.com',
  messagingSenderId: '86635671030'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    RewardModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    RewardServiceProvider
  ]
})
export class AppModule {}
