import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './../shared/toast.service';
import { AuthService } from './../shared/auth.service';
import { Login } from './../users/shared/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login;

  constructor(private auth:AuthService,
              private toast: ToastService,
              private router: Router) { }

  ngOnInit() {
    this.login = new Login();
  }

  async signIn(){
    try {
      await this.auth.login(this.login);
      this.toast.showMessageTop('Usuário logado!!!', 'secondary');
      this.router.navigate(['/tabs/pain']);
    } catch (error) {
      this.toast.showMessageTop(error,'danger');
    }
  }
}