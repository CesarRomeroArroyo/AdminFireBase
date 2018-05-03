import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../../servicios/categorias.service';
import { AppSettings } from '../../../app.settings';

declare var $: any;
@Component({
  selector: 'app-listado-categoria',
  templateUrl: './listado-categoria.component.html',
  styleUrls: ['./listado-categoria.component.css']
})
export class ListadoCategoriaComponent implements OnInit, OnChanges {
  @Input() data;
  @Output() editarCategoria = new EventEmitter<any>();
  @Output() eliminarCategoria = new EventEmitter<string>();
  dataTable: any;
  categorias: any;
  dataGnrl: any;
  columns: Array<any>;
  categoria: any = {idunico: '', nombre: '', descripcion: '', foto: '', usuario: '', estado: 1};

  constructor(private service: CategoriasService, private appSettings: AppSettings) { }

  ngOnInit() {
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
          console.log(modal, trigger);
        },
        complete: function() {  } // Callback for Modal close
      }
    );

    this.buscarCategorias();

  }

  abrirModalNuevo() {
    $('#modalNuevo').modal('open');
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  buscarCategorias() {
    this.service.obtenerCategorias().subscribe(
      value => {
        this.columns = [
          {title: 'Categoria', name: 'nombre'},
          {title: 'Descripcion', name: 'descripcion'}
        ];
        const retorno = [];
        if (value instanceof Object) {
            for (const i of Object.keys(value)) {
                retorno.push(value[i]);
                retorno[retorno.length - 1]['key'] = i;
            }
            console.log(retorno);
        } else {
            return [];
        }
        this.categorias = retorno;
      }
    );
  }

  onEdit(key: any) {
    this.categoria = key;
  }

  eliminarCampo(key: any) {
    const res = confirm('Esta seguro de eliminar el registro');
    if (res) {
      console.log(key);
      this.service.eliminarCategorias(key.id);
      alert('Se Elimino el resgitro correctamente');
    }
  }

  limpiarPublicacion() {
    this.categoria = {idunico: '', nombre: '', descripcion: '', foto: '', usuario: '', estado: 1};
  }

}
