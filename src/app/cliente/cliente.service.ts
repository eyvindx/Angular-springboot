import { Injectable} from '@angular/core';
// import { CLIENTES } from './cliente.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
// import { formatDate, DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeader: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint)
    .pipe(
      tap((response: any) => {
        let clientes = response.clientes as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response: any) => {
       let clientes =  response.clientes as Cliente[];
       return clientes.map(cliente => {
         cliente.nombre = cliente.nombre.toUpperCase();
         cliente.apellido = cliente.apellido.toUpperCase();
         // let datePipe = new DatePipe('es');
         /*
         'EEE dd/MM/yyyy'
         'EEEE dd/MMMM yyyy'
         */
         // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); // comentado para hacerlo en el template
         // formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US'); OTRA FORMA
         return cliente;
       });
      }),
      tap(response => {
        console.log('TAP 2');
      response.forEach( cliente => {
      console.log(cliente.nombre);
      });
      }),
      catchError( e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
    // return this.http.get<Cliente[]>(this.urlEndPoint); una forma se castea en la respuesta de la promesa<>
  }


  getClientesPage(page: number): Observable<any> {
    // return of(CLIENTES);
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map((response: any) => {
      (response.content as Cliente[])
      .map(cliente => {
        cliente.nombre = cliente.nombre.toUpperCase();
        cliente.apellido = cliente.apellido.toUpperCase();
        return cliente;
      });
        return response;
    }),
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map(( response: any) => {
        return (response.cliente as Cliente);
      }),
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeader }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
