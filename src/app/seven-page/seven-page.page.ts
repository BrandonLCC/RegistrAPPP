import { Component, OnInit } from '@angular/core';
import { APIService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seven-page',
  templateUrl: './seven-page.page.html',
  styleUrls: ['./seven-page.page.scss'],
})
export class SevenPagePage implements OnInit {
  //Datos de la pagina six
  datosAsistencia: any;
  //Nro de clases totales
  nroClases: number = 10;
  //Count de ausentes y presentes
  presente: number = 0;
  ausente: number = 0;
  mensaje1: string = 'Datos cargados';
  mensaje2: string = 'Clase finalizada';
  constructor(private router: Router, private api: APIService) {}

  ngOnInit() {
    this.api.AltertaApi(this.mensaje1);

    // obtenemos datos de los asitencia (localstorage)
    const savedDatosAsistencia = localStorage.getItem('datosAsistencia');
    if (history.state.datosAsistencia) {
      this.datosAsistencia = history.state.datosAsistencia;
      localStorage.setItem(
        'datosAsistencia',
        JSON.stringify(this.datosAsistencia)
      );
    } else {
      const savedDatosAsistencia = localStorage.getItem('datosAsistencia');
      if (savedDatosAsistencia) {
        this.datosAsistencia = JSON.parse(savedDatosAsistencia);
      }
    }

    console.log(this.datosAsistencia);

    const alumno = this.datosAsistencia.presentes;
    console.log('mostrando de los presentes', alumno);

    if (this.datosAsistencia.estaPresente) {
      this.presente += 1;
      console.log('presente if', this.presente);
    } else {
      this.ausente += 1;
      console.log('ausente else', this.ausente);
    }
  }

  //No terminado
  calculoAsistencia() {
    const porcentajeAsistencia = (this.presente / this.nroClases) * 100;
    return porcentajeAsistencia;
  }

  btnFinalizarClase() {
    this.api.AltertaApi(this.mensaje2);
    localStorage.removeItem('datosAsistencia'); // funcion limpiar datosss
  }
}
