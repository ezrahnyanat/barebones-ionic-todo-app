import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'

export const firebaseConfig = {
  apiKey: "AIzaSyB1QXdtvWKuEkTBTJHiXLO2BQNuxfc0NUs",
  authDomain: "todolist-fcf8b.firebaseapp.com",
  databaseURL: "https://todolist-fcf8b.firebaseio.com",
  projectId: "todolist-fcf8b",
  storageBucket: "todolist-fcf8b.appspot.com",
  messagingSenderId: "699903704039"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
