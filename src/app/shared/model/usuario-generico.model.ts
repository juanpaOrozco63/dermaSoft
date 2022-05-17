export class UsuarioGenerico {
  id: number;
  nombre: string;
  imageUrl: string;
  constructor(id: number, nombre: string, imageUrl: string) {
    this.id = id;
    this.nombre = nombre;
    this.imageUrl = imageUrl;
  }
}
