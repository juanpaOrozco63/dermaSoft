import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-settings-doctor',
  templateUrl: './settings-doctor.component.html',
  styleUrls: ['./settings-doctor.component.css']
})
export class SettingsDoctorComponent implements OnInit {
  email:String;
  public doctors: Doctor[]=[];
  doctor:Doctor= new Doctor(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  constructor(private doctorService:DoctorService) { }

   ngOnInit() {
    this.email= localStorage.getItem("Email");
     this.findDoctor(this.email);
    this.doctorData();
  }
     findDoctor(email){
    this.doctorService.findByEmail(email).subscribe(async (doctor)=>{
      this.doctors.push(doctor);
      await this.doctorData()
    })
   
      
  }
    async doctorData(){
    this.doctors.forEach((data)=>{
      this.doctor.birthday = this.getFormattedDate(data.birthday)
      this.doctor.firstName = data.firstName
      this.doctor.lastName = data.lastName
      this.doctor.lastName2 = data.lastName2
      this.doctor.phone = data.phone
      this.doctor.gender=data.gender
      this.doctor.price= data.price
     
    })
  }
  getFormattedDate(data) {
    let dd = new Date(data).getUTCDate().toString();
    let mm = new Date(data).getMonth().toString();
    let yy = new Date(data).getFullYear().toString();
    return new Date(Number(yy), Number(mm), Number(dd));
  }
}
