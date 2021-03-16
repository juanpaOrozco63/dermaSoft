export class Patient {
  constructor(
    public approved: string,
    public birthdate: Date,
    public firstName: string,
    public gender: string,
    public height: number,
    public image: string,
    public lastName: string,
    public lastName2: string,
    public maritalStatus: string,
    public ocupation: string,
    public patientId: number,
    public phone: string,
    public verified: string,
    public weight: number,
    public cityId_City: number,
    public epsId_Eps: number,
    public userId: string,
    public state: string
  ) {}
}
