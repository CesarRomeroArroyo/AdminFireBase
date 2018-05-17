import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as UsuarioActions from './../actions/usuario.actions';
import { FirebaseService } from '../servicios/firebase.service';



@Injectable()
export class UsuarioEffects {
    constructor( private actions: Actions, private service: FirebaseService) {}

    @Effect() getUsuario$ = this.actions.ofType(UsuarioActions.GET_USUARIO)
                            .map((action: UsuarioActions.GetUsuario) => action.payload)
                            .mergeMap(payload => this.service.obtenerDatos('general_usuario'))
                            .map(post => {
                                return new UsuarioActions.GetUsuarioSucces(post);
                              });



    @Effect() addUsuario$ = this.actions.ofType(UsuarioActions.ADD_USUARIO)
                            .map((action: UsuarioActions.AddUsuario) => action.payload)
                            .mergeMap(payload => this.service.guardarDatos('general_usuario', payload));

}
