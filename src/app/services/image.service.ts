import { Injectable } from '@angular/core';
const GENERIC_IMAGE = 'https://www.asf.com.mx/Imagenes/Login.png';
const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getImage(imgUser: string): string {
    return imgUser !== null && URL_PATTERN.test(imgUser)
      ? imgUser
      : GENERIC_IMAGE;
  }
}
