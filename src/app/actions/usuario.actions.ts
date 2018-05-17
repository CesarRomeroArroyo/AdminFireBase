import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';


export const ADD_USUARIO =      '[Usuario] Add';
export const REMOVE_USUARIO =   '[Usuario] Remove';


export class AddUsuario implements Action {
    readonly type = ADD_USUARIO;
    constructor(public payload: UsuarioModel) {}
}

export class RemoveUsuario implements Action {
    readonly type = REMOVE_USUARIO;
    constructor(public payload: number) {}
}

export type Actions =   AddUsuario
                        | RemoveUsuario;

