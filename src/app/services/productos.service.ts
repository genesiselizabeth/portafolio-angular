import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();
   }

   // tslint:disable-next-line: typedef
   private cargarProductos(){
      this.http.get('https://angular-html-4f89c-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
          this.productos = resp;
          this.cargando = false;
    });

  }

  // tslint:disable-next-line: typedef
  getProducto( id: string){
    return this.http.get(`https://angular-html-4f89c-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  // tslint:disable-next-line: typedef
  buscarProducto( termino: string){

    if ( this.productos.length === 0 ){
      // cargar productos
        // ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
    } else{
      // aplicar filtro
      this.filtrarProductos( termino );
    }

  }

  // tslint:disable-next-line: typedef
  private filtrarProductos( termino: string ){

    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || prod.titulo.indexOf( termino ) >= 0){
          this.productosFiltrado.push(prod);
      }

    });

  }
}
