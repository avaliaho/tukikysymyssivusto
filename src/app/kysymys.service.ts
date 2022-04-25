import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kysymys } from './kysymys';

@Injectable({
  providedIn: 'root'
})
export class KysymysService {

  constructor(private http: HttpClient) { }

  private kysymyksetUrl = 'http://localhost/wordpress/wp-json/wp/v2';

  /** Haetaan kaikki kysymykset palvelimelta */
  haeKysymykset(sivu: number, jarjestys: string, laskevaNouseva: string): Observable<Kysymys[]> {
    return this.http.get<Kysymys[]>(`${this.kysymyksetUrl}/posts?page=${sivu}&per_page=10&orderby=${jarjestys}&order=${laskevaNouseva}`)
  }

  /** Haetaan haluttujen id-numeroiden perusteella tietyt avainsanat */
  haeAvainSanat(numerot: string): Observable<any> {
    return this.http.get<any>(`${this.kysymyksetUrl}/tags?include=${numerot}`);
  }

  /** Haetaan haluttujen id-numeroiden perusteella tietyt vastaukset */
  haeVastaukset(numerot: string): Observable<any> {
    return this.http.get<any>(`${this.kysymyksetUrl}/comments?post=${numerot}`);
  }

  /** Haetaan http-vastauksen headerit observe-lisäoptiolla */
  haeHeaderit(): Observable<HttpResponse<Kysymys[]>> {
    return this.http.get<Kysymys[]>(`${this.kysymyksetUrl}/posts?per_page=10`,
      { observe: 'response' });
  }

  /** Haetaan kaikki hakuehtoja vastaavat kysymykset palvelimelta */
  haeKysymyksetHakusanalla(hakuTermi: string, sivu: number): Observable<Kysymys[]> {
    return this.http.get<Kysymys[]>(`${this.kysymyksetUrl}/search?search=${hakuTermi}&per_page=10&page=${sivu}`)
  }

  /** Haetaan hakuehtoja vastaavan http-vastauksen headerit observe-lisäoptiolla */
  haeHeaderitHakusanalla(hakuTermi: string): Observable<HttpResponse<Kysymys[]>> {
    return this.http.get<Kysymys[]>(`${this.kysymyksetUrl}/search?search=${hakuTermi}&per_page=10`,
    { observe: 'response' });
  }

}
