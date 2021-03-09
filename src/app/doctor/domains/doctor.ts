export class Doctor {
    constructor(
        public birthday: Date,
        public description: string,
        public doctorId: number,
        public firstName: string,
        public gender: string,
        public image: string,
        public lastName: string,
        public lastName2: string,
        public phone: string,
        public price: number,
        public reputation: number,
        public verified: string,
        public cityId_City: number,
        public userId: string,
    ) { }
}