import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) { }

  obtenerDatosLogin(user: string, pass: string): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Usuarios', ref => ref.where('user', '==', user)
                                                                          .where('password', '==', pass)
                                                                          .where('estado', '==', '1'));
    return this.itemsCollection.valueChanges();
  }

}
