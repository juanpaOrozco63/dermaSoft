export class Product {
  constructor(
    public description: string,
    public image: string,
    public name: string,
    public productId: number,
    public state: string,
    public url: string,
    public validRegister: Date
  ) {}
}
