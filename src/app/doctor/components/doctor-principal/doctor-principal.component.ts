import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-principal',
  templateUrl: './doctor-principal.component.html',
  styleUrls: ['./doctor-principal.component.css']
})
export class DoctorPrincipalComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
  });
  }
  closeSession(){
    localStorage.setItem("Role","")
    this.route.navigate(['/login'])
  }
}
