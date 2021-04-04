export class Appointment {
  constructor(
    public appointmentId: number,
    public date: Date,
    public description: string,
    public duration: number,
    public reason: string,
    public state: string,
    public validRegister: Date,
    public doctorI: number,
    public patientI: number
  ) {}
}
