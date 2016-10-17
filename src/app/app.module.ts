import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { AuthData } from '../providers/auth-data';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyAbCz1vzBk3cYOrNobVKFSzC6Umm7ARwHg",
    authDomain: "dragonboat-house.firebaseapp.com",
    databaseURL: "https://dragonboat-house.firebaseio.com",
    storageBucket: "dragonboat-house.appspot.com",
    messagingSenderId: "404529462975"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    LandingPage,
    SignupPage,
    LoginPage,
    ResetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    LandingPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage
  ],
  providers: [
    AuthData
  ]
})
export class AppModule {}
