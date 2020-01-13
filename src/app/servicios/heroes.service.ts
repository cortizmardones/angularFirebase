import { Injectable } from '@angular/core';

//Importo la libreria para realizar peticion a APIS por hhtp.
import { HttpClient } from '@angular/common/http';

//Importo el modelo para utilizarlo.
import { HeroeModel } from '../models/heroe.model';

//Tengo que reforzar esta parte.
import { map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://angularudemyfirebase.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any)=> {
        heroe.id = resp.name;
        return heroe;
      })
      );
  }


  actualizarHeroe(heroe:HeroeModel){

    const heroeTemp= {
      ...heroe
    };

    //Para no enviar el id autoincrementable
    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`,heroeTemp)
  }


  //Metodos para mostrar los datos (Recordar que debos transformalos primero)
  getHeroes(){
    return this.http.get(`${ this.url}/heroes.json`)
    .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj: object){
    const heroes : HeroeModel[] = [];
    /*if (heroesObj === null) {
      return [];
    }*/
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;

  }



}
