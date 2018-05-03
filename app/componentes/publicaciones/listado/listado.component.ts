import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PublicacionesService } from '../../../servicios/publicaciones.service';

declare var $: any;
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  @Input() data;
  @Output() editarRegistro = new EventEmitter<any>();
  @Output() eliminarRegistro = new EventEmitter<string>();
  dataTable: any;
  publicaciones: any;
  columns: any;
  publicacion: any;

  constructor(private service: PublicacionesService) { }

  ngOnInit() {
    this.columns = [
      {title: 'Titulo', name: 'titulo'},
      {title: 'Fecha', name: 'fecha'}
    ];

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
    this.buscarPublicaciones();
  }

  abrirModalNuevo() {
    this.limpiarPublicacion();
    $('#modalNuevo').modal('open');
  }

  buscarPublicaciones() {
    this.service.obtenerPublicaciones().subscribe(
      value => {
        this.columns = [
          {title: 'Titulo', name: 'titulo'},
          {title: 'Fecha', name: 'fecha'}
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
        this.publicaciones = retorno;
      }
    );
  }

  editarCampo(key: any) {
    this.publicacion = key;
  }

  eliminarCampo(key: any) {
    const res = confirm('Esta seguro de eliminar el registro');
    if (res) {
      this.service.eliminarPublicacionId(key.id);
      alert('Se Elimino el resgitro correctamente');
    }
  }

  limpiarPublicacion() {
    this.publicacion = {idunico: '', fecha: '', titulo: '', contenido: '', video: '', imagen: '', categoria: '', estado: 'activo'};
  }

}
