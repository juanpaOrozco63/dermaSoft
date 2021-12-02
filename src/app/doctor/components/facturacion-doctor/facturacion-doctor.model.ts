export class Membresia{
    cardType:number;
    cardNumber:number;
    expirationDate:Date;
    password:number;
    subscription:number;
}
export interface PaymentMethod{
    payId:number;
    name:string;
}
export interface Subscription{
    subscriptionId:number;
    name:string;
    price:number;
    description:string;
}