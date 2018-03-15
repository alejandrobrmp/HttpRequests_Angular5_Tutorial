# Peticiones a un servidor - Overview
Las fuentes de este tutorial son:
- [Documentación de Angular](https://angular.io/guide/http)
- [Codecraft](https://codecraft.tv/courses/angular/http/overview/)


## Setup

Contamos con un proyecto base de Angular 5 creado mediante el comando `ng new <nombre>`.

Como ejemplo en el archivo [AppComponentHTML](../src/app/app.component.html), ecribiremos un ejemplo básico para poder probar todo lo que realicemos:

```html
<button (click)="doGet()">GET</button>
<button (click)="doPost()">POST</button>
<button (click)="doPut()">PUT</button>
<button (click)="doDelete()">DELETE</button>
<button (click)="doGetAsPromise()">GET AS PROMISE</button>
<button (click)="doErrorAsPromise()">ERROR AS PROMISE</button>
<button (click)="doErrorAsObservable()">ERROR AS OBSERVABLE</button>
```
Tendremos un error de compilacion puesto que no hemos declarado las funciones qe se ejecutarán cuando hagamos click, por ello en el arcchivo [AppComponentTS](../src/app/app.component.ts), colocamos el siguiente código dentro de la clase:

```typescript
  doGet(): void {

  }

  doPost(): void {

  }

  doPut(): void {

  }

  doDelete(): void {

  }

  doGetAsPromise(): void {

  }

  doErrorAsPromise(): void {

  }

  doErrorAsObservable(): void {

  }
```

El error debería haber desaparecido, si es así ya tenemos el click de los botones enlazados con el código.

Para poder hacer requests a un servidor necesitamos utilizar una serie de módulos, servicios y etc que nos provee Angular.  
En el archivo [AppModuleTS](../src/app/app.module.ts) realizaremos la importación del módulo *HttpClientModule*:

```typescript
import { HttpClientModule } from '@angular/common/http';
```

A continuación debemos insertar este módulo en el array de módulos (imports) del decorador *@NgModule*, quedando algo así:
```typescript
  imports: [
    BrowserModule,
    HttpClientModule
  ]
```

**Nota:** es importante declararlo debajo de *BrowserModule*.

Al haber relizado este paso en el módulo raiz de la aplicación, podremos inyectar la clase *HttpClient* en cualquier otra clase de nuestra aplicación.

Como hemos escrito el código en el componente principal de la aplicación, debemos establecer como parámetro del constructor la clase *HttpClient*. En el archivo [AppComponentTS](../src/app/app.component.ts):

```typescript
  import { HttpClient } from '@angular/common/http'; 

  constructor(private httpClient: HttpClient) {}
```

Ahora detallaremos las peticiones que podemos realizar. Como servidor de pruebas utilizaremos [Httpbin](http://httpbin.org), para ello en el archivo [AppComponentTS](../src/app/app.component.ts) añadiremos en la clase una variable con la url:
```typescript
private url = 'http://httpbin.org';
```

## GET

Definición:
```typescript
get(url: string, options: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
} = {}): Observable<any>
```

Aquí utilizaremos el método `doGet()`, donde colocaremos el siguiente código:

```typescript
    const finalUrl = `${this.url}/get`;
    this.httpClient.get(finalUrl).subscribe(
      res => {
          console.log(res);
      }
    );
```

De esta forma establecemos que la petición get la tiene que realizar a **http://httpbin.org/get**, donde si ponemos dicha url en el navegador nos visualiza información relativa a la petición que hemos realizado.  
Si ejecutamos el proyecto y presionamos el boton *GET* no debería suceder nada, pero si accedemos a la consola del navegador, veremos que nos ha mostrado el json devuelto por la petición.  

### Parámetros
Todas las peticiones pueden tener parámetros, y como vemos, según la definición recibe un objeto con la siguiente nomenclatura:

```typescript
{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}
```

Desde aquí podemos establecer los *Headers*, los parámetros, el tipo de respuesta, entre otros.

## POST

Definición:
```typescript
post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
} = {}): Observable<any>
```

Como podemos observar, la definición del post es la misma que la del get, pero añadiendo el parámetro body, donde pasarémos un objeto que el servidor tratará.  
Aquí utilizaremos el método *doPost()*, en donde insertaremos el siguiente código:

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.post(finalUrl, {
      prop1: 'Valor prop1',
      prop2: 'Valor prop2'
    }).subscribe(
      res => {
        console.log(res);
      }
    );
```

El objeto que le pasamos es un objeto de prueba, y este nos lo devuelve en la respuesta cuando pulsamos el boton:
`{args: {…}, data: "{"prop1":"Valor prop1","prop2":"Valor prop2"}",…}`

## DELETE

Definición:

```typescript
delete(url: string, options: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
} = {}): Observable<any>
```

Como vemos, la definición es la misma que la del get, por lo que podemos copiar y pegar el códgo y cambiar la url de get a delete y el método (*doDelete()*):

```typescript
    const finalUrl = `${this.url}/delete`;
    this.httpClient.delete(finalUrl).subscribe(
      res => {
        console.log(res);
      }
    );
```

Cuando ejecutamos, si vamos a la pestaña *network*, podremos ver que se ejecutan dos peticiones, una de tipo *OPTIONS* y otra de tipo *DELETE*. Dicha request la realiza el navegador antes del post, put, o delete para comprobar si es posible realizar dicha operación.

## PUT

Definición:

```typescript
put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
} = {}): Observable<any>
```

Aquí podemos observar que la definición del put es identica a la del post, por lo que funcionan de la misma forma (*doPut()*):

```typescript
    const finalUrl = `${this.url}/put`;
    this.httpClient.put(finalUrl, {
      prop1: 'Valor prop1',
      prop2: 'Valor prop2'
    }).subscribe(
      res => {
        console.log(res);
      }
    );
```

Obtenemos la misma salida que en el post.

## Errores

Para manejar errores podemos establecer un segundo callback dentro del *subscribe*. Para forzar un error podemos hacer que el *EndPoint* de la url sea post y el metodo al que llamemos sea get (*doErrorAsObservable()*):

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
```

Podemos ver que por consola nos saca el error.

## Promises

Hasta ahora hemos visto como manejar las peticiones con *Observables*, pero vamos a ver como se podria hacer con *Promises*.

Las promises son similares a los observables, la gran diferencia es que las promises ejecutan un único evento cuando esta termina, además de que no permite cancelación, aunque es recomendable conocerlas puesto que puede haber algún caso concreto en que nos sean más útiles, o simplemente porque se utilizan en versiones más antigüas. Veamos pues como se hace un get y como manejar un error.

### GET

Las promises se utilizan de una forma muy similar, en vez de realizar un .subscribe, realizaremos un .toPromise, asi convertiremos el observable en promise. Para probarlo copiaremos el contenido del *doGet()*, y realizaremos el cambio anterior.

```typescript
    const finalUrl = `${this.url}/get`;
    this.httpClient.get(finalUrl).toPromise()
```

Para manejar el evento de salida utilizaremos *.then*, con el mismo contenido que en el get:

```typescript
    .then(
      res => {
      console.log(res);
      }
    );
```

### ERROR

Al igual que en el caso anterior, copiaremos el ejemplo del error con observables al método *doErrorAsPromise()* y realizaremos el mismo cambio:

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl).toPromise()
    .then(
      res => {
        console.log(res);
      }
    );
```

Al igual que en el caso de los observables, si pasamos un segundo callback, este se usará como salida de errores:

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl).toPromise()
    .then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
```

Aunque las promises permiten realizarlo de otra forma, y básicamente es colocar *.catch()* justo despues del *.then()*:

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl).toPromise()
    .then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
```

La funcionalidad es la misma, pero de esta forma puede parecer más visual y mas claro.

## Retry

Una vez que manejamos el error, en algunos casos querremos reintentar la petición. ReactiveX(RxJS), ofrece una serie de utilidades que permiten cosas como esta. En concreto veremos el operador retry.

Antes de nada, debemos tener instalado RxJS y después añadir el import:

```typescript
import { retry } from 'rxjs/operators';
```

Si nos fijamos, cuando realizamos el get, antes de poner *.subscribe* aparecen una serie de funciones, entre ellas, nos interesa utilizar *.pipe*. Pipe es un operador y una funcion de los observables, que nos permite encadenar otros operadores uno detras de otro antes de que el observable acabe. Por ejemplo, cambiamos el contenido de la función *doErrorAsObservable()* a la sigiente:

```typescript
    const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl)
    .pipe(
      retry(3)
    )
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
```

Con esto conseguimos que el operador *retry()* se ejecute antes de que acabe el *get()*. En este caso nos interesa, puesto que antes de que se consiga una respuesta correcta, o incorrecta, podemos querer que la petición se ejecute varias veces, como en este caso está indicado, 3 veces.
Como vemos, en la consola aparece 4 veces el mismo error, puesto que se ejecuta una vez y despues otras tres, y al final la salida que hacemos nosotros por pantalla del mismo error.