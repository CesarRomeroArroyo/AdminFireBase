import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class ProgramasService {
  private itemsCollection: AngularFirestoreCollection<any>;
  user: any;
  constructor(private afs: AngularFirestore, private localstorageService: LocalstorageService) { }

  obtenerProgramas(): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Productos');
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

  obtenerProgramasPorId(id: any): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Productos', ref => ref.where('id', '==', id));
    return this.itemsCollection.valueChanges();
  }

  eliminarProgramas(id: any) {
    this.itemsCollection = this.afs.collection<any>('Productos');
    this.itemsCollection.doc(id).delete().then(
      () => {
      }
    );
  }

  guardarProgramas(data)  {
    this.user = JSON.parse(this.localstorageService.obtener('USER_DOMICILIOS'))[0];
    data.usuario = this.user.email;
    this.itemsCollection = this.afs.collection<any>('Productos');
    this.itemsCollection.add(data);
  }

  actualizarProgramas(data, id) {
    this.itemsCollection = this.afs.collection<any>('Productos');
    this.itemsCollection.doc(id).update(data).then(
      () => {
      }
    );
  }
}
