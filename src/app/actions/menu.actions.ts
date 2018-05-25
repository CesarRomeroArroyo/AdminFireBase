import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { MenuModel } from '../reducers/menu.reducer';

export const CREATE_MENU = '[Menu] Create';
export const UPDATE_MENU = '[Menu] Update';
export const DELETE_MENU = '[Menu] Delete';

export class Create implements Action {
    readonly type = CREATE_MENU;
    constructor(public Menu: MenuModel) {}
}

export class Update implements Action {
    readonly type = UPDATE_MENU;
    constructor(
        public id: string,
        public change: Partial<MenuModel>,
    ) {}
}

export class Delete implements Action {
    readonly type = DELETE_MENU;
    constructor(public id: string) {}
}

export type MenuActions
= Create
| Update
| Delete;
