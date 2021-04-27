export class FinalizarCitaDTO {
  constructor(
    public date: Date,
    public description: string,
    public eps: string,
    public firstNamePatient: string,
    public gender: string,
    public lastNamePatient: string
  ) {}
}
