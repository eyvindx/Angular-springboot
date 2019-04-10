import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pollo',
  templateUrl: './pollo.component.html',
  styleUrls: ['./pollo.component.css']
})
export class PolloComponent implements OnInit {
  estado = false;
  title = 'Mostrar Lista';
  opciones = ['Mostrar Lista', 'Ocultar Lista'];
  arreglo: string[] = ['pollo', 'gato', 'rata', 'elefante'];
  constructor() { }
  cambiarEstado() {
    this.estado = !this.estado;
    if (this.estado) {
      this.title = this.opciones[1];
    } else {
      this.title = this.opciones[0];
    }
  }


  ngOnInit() {
  }

}
