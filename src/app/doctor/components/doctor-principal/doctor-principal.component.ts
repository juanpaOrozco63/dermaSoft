import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { FacturacionService } from '../../services/facturacion.service';

@Component({
  selector: 'app-doctor-principal',
  templateUrl: './doctor-principal.component.html',
  styleUrls: ['./doctor-principal.component.css'],
})
export class DoctorPrincipalComponent implements OnInit {
  constructor(
    private route: Router,
    private facturacionService: FacturacionService
  ) {}

  ngOnInit(): void {
    console.log('NombreCambio');
    
    this.facturacionService.pruebita = 'Steven';
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  }
  closeSession() {
    localStorage.setItem('Role', '');
    localStorage.setItem('Email', '');
    this.route.navigate(['/login']);
  }
}
