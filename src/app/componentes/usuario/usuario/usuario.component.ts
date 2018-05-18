import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UsuarioModel } from './../../../models/usuario.model';
import { AppState } from './../../../app.state';
import * as UsuarioActions from './../../../actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  usuarios: UsuarioModel;
  usuarioNuevo: UsuarioModel;
  constructor( private store: Store<AppState> ) {
    this.store.select('usuarios').subscribe(data => {
      this.usuarios = data[0];
    });
    this.store.dispatch(new UsuarioActions.GetUsuario());
  }

  ngOnInit() {  }


  prueba() {
    console.log(this.usuarios);
  }

}
