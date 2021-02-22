export class City {
    constructor(
        public cityCode: string,
        public cityId: number,
        public description: string,
        public state: string,
        public validRegister: string,
        public departmentId: number
    ) { }
}