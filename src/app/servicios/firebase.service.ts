import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';


@Injectable()
export class FirebaseService {

  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private appSettings: AppSettings) { }

  obtenerDatos(tabla: string): Observable<any> {
    this.itemsCollection = this.afs.collection<any>(tabla);
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


  obtenerDatosPorId(tabla: string, id: any): Observable<any> {
    this.itemsCollection = this.afs.collection<any>(tabla, ref => ref.where('id', '==', id));
    return this.itemsCollection.valueChanges();
  }

  obtenerDatosPorIdUnico(tabla: string, id: any): Observable<any> {
    this.itemsCollection = this.afs.collection<any>(tabla, ref => ref.where('idunico', '==', id));
    return this.itemsCollection.valueChanges();
  }

  eliminarDatos(tabla: string, id: any) {
    this.itemsCollection = this.afs.collection<any>(tabla);
    this.itemsCollection.doc(id).delete().then(
      () => {

      }
    );
  }

  guardarDatos(tabla: string, data)  {
    data.idunico = this.appSettings.guid();
    this.itemsCollection = this.afs.collection<any>(tabla);
    return this.itemsCollection.add(data);
  }


  actualizarDatos(tabla: string, data, id) {
    this.itemsCollection = this.afs.collection<any>(tabla);
    this.itemsCollection.doc(id).update(data).then(
      () => {

      }
    );
  }
}
