// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersAgentesaude } from './../users/shared/users-agentesaude';
import { UsersPaciente } from './../users/shared/users-paciente';
import { ToastService } from '../shared/toast.service';
import { AuthService } from '../shared/auth.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  usersPaciente: UsersPaciente;
  usersAgentesaude: UsersAgentesaude;
  tipousuario: string;
  email: string;
  password: string;
  // email: string;
  // password: string;
  // user: string;
  // professionals: any[] = [];

  //professionalDescription: string;


  constructor(private auth:AuthService,
       private toast: ToastService,
    private router: Router) 
  { }

  ngOnInit() {
    this.usersPaciente = new UsersPaciente();
    this.usersAgentesaude = new UsersAgentesaude();
    //this.professionalService.getAll().subscribe( (data:any) => {
      //this.professionals = data;
    }
    //)
    
  


  onChange(){
    console.log(this.tipousuario)
  }



  async registerPaciente(){
    this.usersPaciente.email = this.email;
    this.usersPaciente.password = this.password;
    this.usersPaciente.tipousuario = this.tipousuario;

    try {
      await this.auth.registerPaciente(this.usersPaciente);
      this.toast.showMessageTop('Usuário registrado com sucesso !!!', 'secondary');
      this.router.navigate(['login']);
    } catch (error) {
      this.toast.showMessageTop(error,'danger');
    }
  }

registerAgentesaude(){


}


}
  // setProfessional(professional:any){
  //     if(professional){
  //       // console.log(professional);
  //       this.usersAgentesaude.professional = this.professionals.find(item => item.id === this.usersAgentesaude.id_professional).description
  //     } else {
  //       this.usersAgentesaude.professional = "";
  //     }
  // }

