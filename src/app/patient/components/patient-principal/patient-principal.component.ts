import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-patient-principal',
  templateUrl: './patient-principal.component.html',
  styleUrls: ['./patient-principal.component.css'],
})
export class PatientPrincipalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  }
}
