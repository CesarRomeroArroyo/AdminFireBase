import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) { }

  obtenerDatosLogin(usuario: string, password: string): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Usuario', ref => ref.where('user', '==', usuario).where('password', '==', password));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

}
