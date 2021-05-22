import { Component, OnInit } from '@angular/core';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  email:String;
  public patients:Patient[]=[]
  patient:Patient = new Patient(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.email= localStorage.getItem("Email");
    this.findPatient(this.email);
    this.patientData();
  }
  findPatient(email){
    this.patientService.findByEmail(email).subscribe(async (patient)=>{
      this.patients.push(patient)
      await this.patientData()
    })
  }
  async patientData(){
    this.patients.forEach((data)=>{
      this.patient.birthdate= this.getFormattedDate(data.birthdate)
      this.patient.firstName =data.firstName
      this.patient.lastName =data.lastName
      this.patient.lastName2 =data.lastName2
      this.patient.approved =data.approved
      this.patient.phone =data.phone
      this.patient.ocupation =data.ocupation
      this.patient.height =data.height
      this.patient.gender =data.gender
      this.patient.maritalStatus =data.maritalStatus
      this.patient.weight =data.weight
    })
  }
  getFormattedDate(data) {
    let dd = new Date(data).getUTCDate().toString();
    let mm = new Date(data).getMonth().toString();
    let yy = new Date(data).getFullYear().toString();
    return new Date(Number(yy), Number(mm), Number(dd));
  }
}
