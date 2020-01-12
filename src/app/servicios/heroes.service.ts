import { Injectable } from '@angular/core';

//Importo la libreria para realizar peticion a APIS por hhtp.
import { HttpClient } from '@angular/common/http';

//Importo el modelo para utilizarlo.
import { HeroeModel } from '../models/heroe.model';

//Tengo que reforzar esta parte.
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://angularudemyfirebase.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}´/heroes.json`, heroe)
      .pipe(
        map((resp: any)=> {
        heroe.id = resp.name;
        return heroe;
      })
      );
  }


  actualizarHeroe(heroe:HeroeModel){
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`,heroe)
  }

}
