import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-doctor-principal',
  templateUrl: './doctor-principal.component.html',
  styleUrls: ['./doctor-principal.component.css']
})
export class DoctorPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
  });
  }

}
