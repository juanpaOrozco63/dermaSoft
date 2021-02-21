export class Admin {
    constructor(
        public adminIdentification: string,
        public email: string,
        public firstName: string,
        public identificationType: string,
        public lastName: string,
        public lastName2: string,
        public password: string,
        public state: string,
        public validRegister: Date
    ) { }
}