import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
declare let firebase: any;
/*
Generated class for the AuthData provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/


@Injectable()
export class AuthData {

  userProfile: any;
  fireAuth: any;

  constructor(public af: AngularFire) {
    this.userProfile = firebase.database().ref('/userProfile');
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  getUser() {
    return this.fireAuth;
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  anonymousLogin(): any {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  linkAccount(email: string, password: string) {
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.fireAuth.link(credential).then( (user) => {
      this.userProfile.child(user.uid).update({
        email: email,
      });
    }, (error) => {
      console.log("Account linking error", error);
    });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return firebase.auth().signOut();
  }
}
