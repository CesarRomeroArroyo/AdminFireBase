import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from './localstorage.service';


@Injectable()
export class CategoriasService {
  private itemsCollection: AngularFirestoreCollection<any>;
  user: any;
  constructor(private afs: AngularFirestore, private localstorageService: LocalstorageService) { }

  obtenerCategorias(): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Categorias');
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

  obtenerCategoriasPorId(id: any): Observable<any> {
    this.itemsCollection = this.afs.collection<any>('Categorias', ref => ref.where('id', '==', id));
    return this.itemsCollection.valueChanges();
  }

  eliminarCategorias(id: any) {
    this.itemsCollection = this.afs.collection<any>('Categorias');
    this.itemsCollection.doc(id).delete().then(
      () => {
        // location.reload();
      }
    );
  }

  guardarCategorias(data)  {
    this.user = JSON.parse(this.localstorageService.obtener('USER_DOMICILIOS'))[0];
    data.usuario = this.user.email;
    this.itemsCollection = this.afs.collection<any>('Categorias');
    this.itemsCollection.add(data);
  }

  actualizarCategorias(data, id) {
    this.itemsCollection = this.afs.collection<any>('Categorias');
    this.itemsCollection.doc(id).update(data).then(
      () => {
        // location.reload();
      }
    );
  }

}
