import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../domains/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email:String;
  public admins: Admin[]=[];

  constructor(private adminService:AdminService) { }
 
  ngOnInit(): void {
    this.email= localStorage.getItem("Email");
     this.findAdmin(this.email);
  }
   findAdmin(email){
    this.adminService.findByEmail(email).subscribe((admin)=>{
      this.admins.push(admin);
      console.log(this.admins);
    })

    
  }
  
}
