import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/servicios/heroes.service';

//Libreria para dar avisos bonitos
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesServices: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){
      this.heroesServices.getHeroe(id)
      .subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }

  }


  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      //type: 'info',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    //Aqui valido que si el heroe ya tiene id lo actualizo solamente
    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente'
        //type:'success';
      });
    });

  }

}
