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

     //this.afa.onAuthStateChanged((users)=>{
      this.afa.onAuthStateChanged((credential)=>{
       credential.updateProfile({displayName: user.name, photoURL: ''});
       if(credential){
         this.registerUserPaciente(user, credential.uid);
       }
     })
  }

  registerUserPaciente(user: UsersPaciente, id: string){
    const { tipousuario,
      name,
      email, 
      cartaosus,
      faixaetaria,
      zipcode,
      address,
      address_district,
      address_number,
      address_city,
      address_state,
      address_complement, } = user;
    this.afs.collection('users').doc(id).set(
      {
        tipousuario: tipousuario,
        name: name,
        email: email,
        cartaosus: cartaosus,
        faixaetaria: faixaetaria,
        zipcode: zipcode,
        address: address,
        address_district: address_district,
        address_number: address_number,
        address_city: address_city,
        address_state: address_state,
        address_complement: address_complement
        
      }
    )
  }

  registerAgente(user: UsersAgentesaude){
     this.afa.createUserWithEmailAndPassword(user.email, user.password);

     this.afa.onAuthStateChanged((credential)=>{
       credential.updateProfile({displayName: user.name, photoURL: ''});
       
       if(credential){
         this.registerAgentesaude(user, credential.uid);
       }
     })
   }

   registerAgentesaude(user: UsersAgentesaude, id: string){
     const { tipousuario, 
      name, 
      email, 
      registro, 
      estado } = user;
 this.afs.collection('users').doc(id).set(
   {
     tipousuario: tipousuario,
     name: name,
     email: email,
     registro: registro,
     estado: estado
    // id_professional: id_professional,
     //professional: professional,
   }
 )
}



}