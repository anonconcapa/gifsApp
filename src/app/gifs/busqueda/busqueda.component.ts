import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {


  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService){}

  get historial():string[]{
    return this.gifsService.historial;
  }

buscar() {

  
  const valor = this.txtBuscar.nativeElement.value;

  if(valor.trim().length === 0 ){
    return;
  }
if( this.historial.includes(valor.trim())){
  return alert('ya escribiste esto deja de boludear con los espacios');
}

  this.gifsService.buscarGifs( valor );

  this.txtBuscar.nativeElement.value = '';
}
  
}
