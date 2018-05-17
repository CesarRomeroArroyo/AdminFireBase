import { Action } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';
import * as UsuarioActions from '../actions/usuario.actions';

const initialState: UsuarioModel = {
    nombre : '',
    user: '',
    password: '',
    email: '',
    estado: 1
};

export function usuarioReducer(state: UsuarioModel[] = [], action: UsuarioActions.Actions ) {
    switch (action.type) {
        case UsuarioActions.GET_USUARIO:
            return { ...state };
        case UsuarioActions.GET_USUARIO_SUCCESS:
            return { ...state, ...action.payload };
        case UsuarioActions.ADD_USUARIO:
            return [...state, action.payload];
        case UsuarioActions.REMOVE_USUARIO:
            state.splice(action.payload, 1);
            return state;
        default:
            return state;
    }
}


