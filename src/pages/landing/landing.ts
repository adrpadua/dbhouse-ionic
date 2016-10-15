import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data'

/*
  Generated class for the Landing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {}

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToList() {
    this.authData.anonymousLogin().then( user => {
      this.navCtrl.push(HomePage);
    });
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loading.present();
  }

  ionViewDidLoad() {
    console.log('Hello Landing Page');
  }

}
