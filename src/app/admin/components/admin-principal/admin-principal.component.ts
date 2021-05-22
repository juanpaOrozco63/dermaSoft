import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-principal',
  templateUrl: './admin-principal.component.html',
  styleUrls: ['./admin-principal.component.css']
})
export class AdminPrincipalComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
  });
  }
  closeSession(){
    localStorage.setItem("Role","")
    localStorage.setItem("Email","")
    this.route.navigate(['/login'])
  }
}
