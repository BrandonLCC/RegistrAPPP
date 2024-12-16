import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-five-page',
  templateUrl: './five-page.page.html',
  styleUrls: ['./five-page.page.scss'],
})
export class FivePagePage implements OnInit {
  cursoSeleccionado: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.cursoSeleccionado = navigation.extras.state['cursoSeleccionado'];
    }
  }

  ionViewDidLeave() {
    this.cursoSeleccionado = null;
    console.log('Limpiando datos al cambiar de página');
  }
}
