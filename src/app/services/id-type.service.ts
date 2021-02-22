import { Injectable } from '@angular/core';
import { IdType } from '../domains/idType';

@Injectable({
  providedIn: 'root'
})
export class IdTypeService {

  //Arreglo de tipos de identificación
  public idTypes: IdType[];

  constructor() {
    //Asignando los valores al arreglo
    this.idTypes = [
      { id: 'AS', name: 'Adulto sin identidad' },
      { id: 'CC', name: 'Cédula de ciudadanía' },
      { id: 'CE', name: 'Cédula de extranjería' },
      { id: 'MS', name: 'Menor sin identificación' },
      { id: 'PA', name: 'Pasaporte' },
      { id: 'RC', name: 'Registro Civil' },
      { id: 'TI', name: 'Tarjeta de identidad' },
    ];
  }

  //Retornar todos los tipos de identificación
  public findAll():IdType[]{
    return this.idTypes;
  }
}
