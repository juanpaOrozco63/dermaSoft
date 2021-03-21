import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-principal',
  templateUrl: './patient-principal.component.html',
  styleUrls: ['./patient-principal.component.css'],
})
export class PatientPrincipalComponent implements OnInit {
  constructor(private route:Router) {}

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  }
  closeSession(){
    localStorage.setItem("Role","")
    this.route.navigate(['/login'])
  }
}
