import * as actions from './../actions/menu.actions';
import { EntityState,  createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface MenuModel {
    id: string;
    icono: string;
    texto: string;
    link: string;
    estado: number;
}

export const menuAdapter = createEntityAdapter<MenuModel>();
export interface State  extends EntityState<MenuModel> {}

const defaultMenu = {
    ids: ['1'],
    entities: {
        '1': {
            id: '1',
            icono: 'fa fa-plus',
            texto: 'Adicionar',
            link: 'Prueba',
            estado: 1
        }
    }
};


export const initialState: State = menuAdapter.getInitialState(defaultMenu);

export function menuReducer(state: State = initialState, action: actions.MenuActions) {
    switch (action.type) {
        case actions.CREATE_MENU:
            return menuAdapter.addOne(action.Menu, state);
        case actions.UPDATE_MENU:
            return menuAdapter.updateOne({
                id: action.id,
                changes: action.change,
            }, state);
        case actions.DELETE_MENU:
            return menuAdapter.removeOne(action.id, state);
        default:
            return state;
    }
}

export const getMenuState = createFeatureSelector<State>('menu');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = menuAdapter.getSelectors(getMenuState);

