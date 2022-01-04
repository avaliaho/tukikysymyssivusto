import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kysymys } from './kysymys';

@Injectable({
  providedIn: 'root'
})
export class KysymysService {

  constructor(private http: HttpClient) { }

  /** Haetaan kaikki kysymykset palvelimelta */
  haeKysymykset(): Observable<HttpResponse<Kysymys[]>> {
    return this.http.get<Kysymys[]>("http://localhost/wordpress/wp-json/wp/v2/posts",
      { observe: 'response' });
  }
  
  /** Haetaan haluttujen id-numeroiden perusteella tietyt avainsanat */
  haeAvainSanat(numerot: string): Observable<any> {
    return this.http.get<any>(`http://localhost/wordpress/wp-json/wp/v2/tags?include=${numerot}`);
  }

}
