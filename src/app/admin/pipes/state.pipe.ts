import { Pipe } from "@angular/core";

@Pipe({
  name: "state"
})
export class StatePipe {
  transform(state) {
    let estado;
    if(state==='A'){
      estado='Activo'
    }else{      
      estado='Inactivo'
    }
    return estado;
  }
}