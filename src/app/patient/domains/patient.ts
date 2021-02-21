export class Patient {
    constructor(
        public approved: string,
        public birthdate: Date,
        public email: string,
        public firstName: string,
        public gender: string,
        public identificationType: string,
        public lastName: string,
        public lastName2: string,
        public maritalStatus: string,
        public ocupation: string,
        public password: string,
        public patientIdentification: string,
        public phone: string,
        public state: string,
        public validRegister: Date,
        public verified: string,
        public cityId_City: number,
        public epsId_Eps: number
    ) { }
}