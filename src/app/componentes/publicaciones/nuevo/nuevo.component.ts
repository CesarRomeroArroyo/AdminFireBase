import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PublicacionesService } from '../../../servicios/publicaciones.service';
import { CategoriasService } from '../../../servicios/categorias.service';
import { AppSettings } from '../../../app.settings';
import { ProgramasService } from '../../../servicios/programas.service';

declare var $: any;
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit, OnChanges {
  @Input() idPublicacion: any;
  publicacion: any = {idunico: '', fecha: '', titulo: '', contenido: '', video: '', categoria: '', imagen: '', estado: 'activo'};
  categorias: any;
  programas: any;
  constructor(private service: PublicacionesService, private serviceCategorias: CategoriasService, private appSettings: AppSettings,
    private programasService: ProgramasService) {
    this.serviceCategorias.obtenerCategorias().subscribe(
      result => {
        this.categorias = result;
        console.log('categorias', this.categorias);
      }
    );

    this.programasService.obtenerProgramas().subscribe(
      result => {
        this.programas = result;
      }
    );
   }

  ngOnInit() {

  }



  ngOnChanges(changes: SimpleChanges): void {

    if (this.idPublicacion !== undefined) {
      console.log('publicaion', this.idPublicacion);
      this.publicacion = this.idPublicacion;
    }
  }

  guardarPublicacion() {
    if (this.publicacion.idunico === '') {
      this.publicacion.idunico = this.appSettings.guid();
      this.service.guardarPublicacion(this.publicacion);
      this.limpiarPublicacion();
    } else {
      this.service.actualizarPublicacion(this.publicacion, this.publicacion.id);
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.publicacion.imagen = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  limpiarPublicacion() {
    this.publicacion = {idunico: '', fecha: '', titulo: '', contenido: '', video: '', imagen: '', categoria: '', estado: 'activo'};
  }

}
