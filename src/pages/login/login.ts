import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Campo requerido' },
     { type: 'pattern', message: 'Ingresa un correo valido.' }
   ],
   'password': [
     { type: 'required', message: 'Campo requerido' },
     { type: 'minlength', message: 'La contraseña debe contar minimo con 5 caracteres.' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(MenuPage);
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
