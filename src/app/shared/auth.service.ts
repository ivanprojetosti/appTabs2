import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { UsersPaciente } from '../users/shared/users-paciente';
import { UsersAgentesaude } from '../users/shared/users-agentesaude';
import { Login } from './../users/shared/login';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private user: string;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }


  login(login: Login){
    return this.afa.signInWithEmailAndPassword(login.email, login.password)
  }

  logout(){
    this.afa.signOut();
    this.router.navigate(['/login']);
  }

  registerPaciente(user: UsersPaciente){
    this.afa.createUserWithEmailAndPassword(user.email, user.password);

    // this.afa.onAuthStateChanged((users)=>{
    //   users.updateProfile({displayName: user.name, photoURL: ''});
    //   if(users){
    //     this.registerUserPaciente(user, users.uid);
    //   }
    // })
  }

  registerUserPaciente(user: UsersPaciente, id: string){
    const { tipousuario,
      name,
      email } = user;
    this.afs.collection('users').doc(id).set(
      {
        name: name,
        email: email,
        
      }
    )
  }

  registerAgente(user: UsersAgentesaude){
    this.afa.createUserWithEmailAndPassword(user.email, user.password);

    this.afa.onAuthStateChanged((userProfile)=>{
      userProfile.updateProfile({displayName: user.name, photoURL: ''});
      if(userProfile){
        this.registerAgentesaude(user, userProfile.uid);
      }
    })
  }

  registerAgentesaude(user: UsersAgentesaude, id: string){
    
}



}