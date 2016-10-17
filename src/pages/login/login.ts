import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';

/*
Generated class for the Login page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: FormGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  public loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      console.log("constructor");

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

    }

    elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }

    loginUser() {
      this.submitAttempt = true;

      if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
      } else {
        this.authData.loginUser(this.loginForm.value.email,
          this.loginForm.value.password).then( authData => {
            this.navCtrl.setRoot(HomePage);
          }, error => {
            this.loading.dismiss().then( () => {
              let alert = this.alertCtrl.create({
                message: error.message,
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
            });
          });

          this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true
          });
          this.loading.present();
        }
      }

      goToResetPassword() {
        this.navCtrl.push(ResetPasswordPage);
      }




    }
