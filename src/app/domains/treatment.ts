export class Treatment {
  constructor(
    public description: string,
    public duration: number,
    public quantity: number,
    public state: string,
    public treatmentId: number,
    public validRegister: Date,
    public appointmentI: number,
    public productI: number
  ) {}
}
