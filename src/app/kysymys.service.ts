import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kysymys } from './kysymys';

@Injectable({
  providedIn: 'root'
})
export class KysymysService {

  constructor(private http: HttpClient) { }

  /** Haetaan kaikki kysymykset palvelimelta */
  haeKysymykset(): Observable<Kysymys[]> {
    return this.http.get<Kysymys[]>("http://localhost/wordpress/wp-json/wp/v2/posts");
  }
}
