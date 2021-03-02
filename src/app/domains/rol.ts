export class Rol {
    constructor(
        public email: string,
        public identificationType: string,
        public password: string,
        public register: string,
        public role: number,
        public state: string,
        public userIdentification: string,
        public validRegister: Date,
    ) { }
}