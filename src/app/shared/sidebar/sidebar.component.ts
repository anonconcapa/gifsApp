import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial():string[] {
    return this.gifsService.historial;
  }


  constructor( private gifsService: GifsService){}

buscar(termino:string, event:any){
  event.preventDefault();
  this.gifsService.buscarGifs(termino);

}


}
