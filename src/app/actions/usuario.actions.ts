import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';


export const GET_USUARIO =              '[Usuario] Get';
export const GET_USUARIO_SUCCESS =      '[Usuario] Get Success';
export const ADD_USUARIO =              '[Usuario] Add';
export const REMOVE_USUARIO =           '[Usuario] Remove';


export class GetUsuario implements Action {
    readonly type = GET_USUARIO;
    payload = '';
}

export class GetUsuarioSucces implements Action {
    readonly type = GET_USUARIO_SUCCESS;
    constructor (public payload: any) {}
}

export class AddUsuario implements Action {
    readonly type = ADD_USUARIO;
    constructor(public payload: UsuarioModel) {}
}

export class RemoveUsuario implements Action {
    readonly type = REMOVE_USUARIO;
    constructor(public payload: number) {}
}

export type Actions =   GetUsuario
                        | GetUsuarioSucces
                        | AddUsuario
                        | RemoveUsuario;

