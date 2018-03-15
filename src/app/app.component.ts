import { Component, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private url = 'http://httpbin.org';

  constructor(private httpClient: HttpClient) {}

  doGet(): void {
    const finalUrl = `${this.url}/get`;
    this.httpClient.get(finalUrl).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  doPost(): void {
    const finalUrl = `${this.url}/post`;
    this.httpClient.post(finalUrl, {
      prop1: 'Valor prop1',
      prop2: 'Valor prop2'
    }).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  doPut(): void {
    const finalUrl = `${this.url}/put`;
    this.httpClient.put(finalUrl, {
      prop1: 'Valor prop1',
      prop2: 'Valor prop2'
    }).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  doDelete(): void {
    const finalUrl = `${this.url}/delete`;
    this.httpClient.delete(finalUrl).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  doGetAsPromise(): void {
    const finalUrl = `${this.url}/get`;
    this.httpClient.get(finalUrl).toPromise()
    .then(
      res => {
      console.log(res);
      }
    );
  }

  doErrorAsPromise(): void {
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
  }

  doErrorAsObservable(): void {
    /*const finalUrl = `${this.url}/post`;
    this.httpClient.get(finalUrl).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );*/

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

  }

}
