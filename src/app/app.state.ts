import { UsuarioModel } from './models/usuario.model';

export interface AppState {
    readonly usuarios: UsuarioModel[];
}

