export class PatientAppointment {
    constructor(
      public date: Date,
      public firstName: string,
      public lastName: string,
      public image: string,
      public description: string,
      public price: number
    ) {}
  }