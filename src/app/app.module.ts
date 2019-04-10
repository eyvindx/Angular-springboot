import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './cliente/form.component';
import { FormsModule} from '@angular/forms';
import { PolloComponent } from './shared/pollo/pollo.component';
import { registerLocaleData } from '@angular/common';
import LocaleSV from '@angular/common/locales/es-SV';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material';
import {MatMomentDateModule } from '@angular/material-moment-adapter';

registerLocaleData(LocaleSV, 'SV');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full'},
  { path: 'clientes', component: ClienteComponent},
  { path: 'clientes/page/:page', component: ClienteComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClienteComponent,
    FormComponent,
    PolloComponent,
    PaginatorComponent
  ],
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [{provide: LOCALE_ID, useValue: 'SV'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
