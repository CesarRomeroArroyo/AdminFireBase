import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { ProgramasService } from '../../../servicios/programas.service';
import { AppSettings } from '../../../app.settings';
import { CategoriasService } from '../../../servicios/categorias.service';


declare var $: any;
@Component({
  selector: 'app-nuevo-programa',
  templateUrl: './nuevo-programa.component.html',
  styleUrls: ['./nuevo-programa.component.css']
})
export class NuevoProgramaComponent implements OnInit, OnChanges {
  @Input() idPublicacion: any;
  programa: any = {idunico: '', nombre: '', categoria: '', desripcion: '', foto: '', precio: '', adicionales: {},  estado: 1};
  categorias: any;
  constructor(private service: ProgramasService, private appSettings: AppSettings, private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.buscarCategorias();
    $('select').material_select();
  }

  buscarCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      result => {
        this.categorias = result;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idPublicacion !== undefined) {
      this.programa = this.idPublicacion;
    }
  }

  guardarPrograma() {
    console.log(this.programa);
    if (this.programa.idunico === '') {
      this.programa.idunico = this.appSettings.guid();
      this.service.guardarProgramas(this.programa);
      this.limpiarPublicacion();
    } else {
      this.service.actualizarProgramas(this.programa, this.programa.id);
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    if (file.size <= 1048487) {
      const myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.programa.foto = myReader.result;
      };
      myReader.readAsDataURL(file);
    } else {
      alert('La imagen no puede ser mayor a 1MB, por favor cargue una imagen mas pequeña');
    }
  }

  limpiarPublicacion() {
    this.programa = {idunico: '', nombre: '', categoria: '', desripcion: '', foto: '', precio: '', adicionales: {},  estado: 1};
  }

}
