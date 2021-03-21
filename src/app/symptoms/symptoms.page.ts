import { Component, OnInit } from '@angular/core';
import { SymptomsService } from './shared/symptoms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
  symptoms: Observable<any[]>;


  constructor(private symptomsService:SymptomsService) { }

  ngOnInit() {
    this.getAll();
  }

getAll(){

  this.symptoms = this.symptomsService.getAll();
}


}
