import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      if ((<any>window).calabash) {
        (<any>window).calabash.start(() => {
          console.log('Calabash started')
        }, (err) => {
          console.log(err);
        });
      }

      var statusBarOverlayWebView = platform.is('ios');

      statusBar.overlaysWebView(statusBarOverlayWebView);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
    });
  }
}
