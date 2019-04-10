import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {
  templateLiteral = `hola `;
  errores = [];
  titulo = 'Crear Cliente' ;
  subcription: Subscription = new Subscription();
  private cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
  this.activatedRoute.paramMap.subscribe(
    params => {
      const id = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
          , error => {
            swal('error', error.error.error);
          }
        );
      }
    }
  );
  }
  create(): void {
    this.subcription = this.clienteService.create(this.cliente)
    .subscribe(response => {
      this.router.navigate(['/clientes']);
      swal('Nuevo cliente', `${response.cliente.nombre} :${response.mensaje}`, 'success');
      this.cliente = response.cliente;
      }, error => {
        this.errores = error.error.errors as string[];
        console.log(error.error.errors);
        console.log('Código de error desde el backend ' + error.status);
      }, () => {
        this.subcription.unsubscribe();
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
    .subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Cliente actualizado', `${response.cliente.nombre} :${response.mensaje}`, 'success');
      }, error => {
        this.errores = error.error.errors as string[];
        console.log(error.error.errors);
        console.log('Código de error desde el backend ' + error.status)
      }, () => {
        // this.subcription.unsubscribe();
      }
    );
  }


}
