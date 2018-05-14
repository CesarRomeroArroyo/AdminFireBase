import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PublicacionesService {
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor( private http: HttpClient, private afs: AngularFirestore) {
  }

  obtenerPublicaciones(): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('publicaciones', ref => ref.orderBy('fecha', 'desc'));
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

  obtenerPublicacionId(id: any): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('publicaciones', ref => ref.where('id', '==', id));
    return this.itemsCollection.valueChanges();
  }

  eliminarPublicacionId(id: any) {
    this.itemsCollection = this.afs.collection<any>('publicaciones');
    this.itemsCollection.doc(id).delete().then(
      () => {
      }
    );
  }

  guardarPublicacion (data)  {
    this.itemsCollection = this.afs.collection<any>('publicaciones');
    this.itemsCollection.add(data);
  }

  actualizarPublicacion (data, id) {
    this.itemsCollection = this.afs.collection<any>('publicaciones');
    this.itemsCollection.doc(id).update(data).then(
      () => {
      }
    );
  }
}
