import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { ProgramasService } from '../../../servicios/programas.service';

declare var $: any;
@Component({
  selector: 'app-listado-programa',
  templateUrl: './listado-programa.component.html',
  styleUrls: ['./listado-programa.component.css']
})
export class ListadoProgramaComponent implements OnInit {
  @Input() data;
  @Output() editarRegistro = new EventEmitter<any>();
  @Output() eliminarRegistro = new EventEmitter<string>();
  dataTable: any;
  programas: any;
  columns: any;
  programa: any;
  constructor(private service: ProgramasService) { }

  ngOnInit() {
    this.columns = [
      {title: 'Nombre', name: 'tipo'}
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

    this.buscarProgramas();
  }

  abrirModalNuevo() {
    $('#modalNuevo').modal('open');
  }

  buscarProgramas() {
    this.service.obtenerProgramas().subscribe(
      value => {
        this.columns = [
          {title: 'Nombre', name: 'nombre'},
          {title: 'Descripcion', name: 'descripcion'},
          {title: 'Precio', name: 'precio'}
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
        this.programas = retorno;
      }
    );
  }

  editarCampo(key: any) {
    this.programa = key;
  }

  eliminarCampo(key: any) {
    const res = confirm('Esta seguro de eliminar el registro');
    if (res) {
      this.service.eliminarProgramas(key.id);
      alert('Se Elimino el resgitro correctamente');
    }
  }

  limpiarPublicacion() {
    this.programa = {idunico: '', nombre: '', categoria: '', horario: '', imagen: ''};
  }

}
