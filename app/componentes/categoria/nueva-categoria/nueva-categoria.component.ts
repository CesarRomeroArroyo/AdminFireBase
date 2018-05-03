import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriasService } from '../../../servicios/categorias.service';
import { AppSettings } from '../../../app.settings';

declare var $: any;
@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit, OnChanges {
  @Input() idPublicacion: any;
  categoria: any = {idunico: '', nombre: '', descripcion: '', foto: '', usuario: '', estado: 1};
  constructor(private service: CategoriasService, private appSettings: AppSettings) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idPublicacion !== undefined) {
      this.categoria = this.idPublicacion;
      console.log('Categoria: ', this.categoria);
    }
  }

  guardarCategoria() {
    if (this.categoria.idunico === '') {
      this.categoria.idunico = this.appSettings.guid();
      this.service.guardarCategorias(this.categoria);
      this.limpiarPublicacion();
    } else {
      this.service.actualizarCategorias(this.categoria, this.categoria.id);
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
        this.categoria.foto = myReader.result;
      };
      myReader.readAsDataURL(file);
    } else {
      alert('La imagen no puede ser mayor a 1MB, por favor cargue una imagen mas pequeña');
    }
  }

  limpiarPublicacion() {
    this.categoria = {idunico: '', nombre: '', descripcion: '', foto: '', usuario: '', estado: 1};
  }

}
