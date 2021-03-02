export class RegisterPatient {
    constructor(
        public email: string,
        public identificationType: string,
        public password: string,
        public register: string,
        public role: number,
        public state: string,
        public userIdentification: string,
        public validRegister: Date,
        public cityI: number,
        public epsI: number,
    ) { }
}