import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse,Gif } from "../interface/gifs.interface";
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string ='2oHxXIXgkJg09BovuQWK1hHMILBVh6CP';
  private _historial:string[] = [];

  public resultados:Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor (private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(this._historial.length > 0){

    //   this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2oHxXIXgkJg09BovuQWK1hHMILBVh6CP&q=${this._historial[0]}&limit=10`) 
    //   .subscribe((resp:any)=>{
    //     this.resultados = resp.data;
    //   });
    // }
    
  }

  buscarGifs( query:string ){
    
    query = query.toLocaleLowerCase();

    if( !this._historial.includes( query )){
      
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2oHxXIXgkJg09BovuQWK1hHMILBVh6CP&q=${query}&limit=10`) 
    .subscribe((resp:any)=>{
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify( this.resultados));
    });

    console.log(this._historial);
  }

}
