import { Component, OnInit } from '@angular/core';
import { UusiKysymys } from '../uusi-kysymys';
import { Avainsana } from '../avainsana';
import { KysymysService } from '../kysymys.service';
import { Observable, Subject, from } from 'rxjs';
import {
  map, mergeMap, take, toArray, concatMap, debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Kysymys } from '../kysymys';

@Component({
  selector: 'app-uusi-kysymys',
  templateUrl: './uusi-kysymys.component.html',
  styleUrls: ['./uusi-kysymys.component.css']
})
export class UusiKysymysComponent implements OnInit {

  constructor(
    private kysymysService: KysymysService,
    private reititin: Router
  ) {
    this.captcha = '';
  }

  otsikko: string = '';
  kysymykset$!: Observable<Kysymys[]>;
  private hakuTermit = new Subject<string>();
  html: string = '';
  captcha: string;
  avainsanat: string = '';
  painettu: Boolean = false;

  // Työnnä hakutermi Observable-striimiin
  hae(termi: string): void {
    this.hakuTermit.next(termi);
  }

  tallennaKysymys(otsikko: string, avainsanat: string) {

    this.painettu = true;

    // arvo on nyt merkkijonojen taulu: ["tagi1","tagi2"]
    let splitatut = avainsanat.split(",");

    from(splitatut)
      .pipe(
        take(3), // <-- otetaan enintään 3 ensimmäistä tagia
        map((tag) => ({ "name": tag })), // <-- mapataan tag merkkijono Tagiin
        mergeMap( // <-- tallenna tagit ja ota talteen palautetut id:t vastauksista
          (tag) => this.kysymysService.lisaaTagi(tag as Avainsana).pipe(
            map((vastaus) => vastaus.id)
          )
        ),
        toArray(), // <-- ryhmitä palautetut id:t yhteen tauluun
        concatMap( // <-- lopullinen tallennuskutsu
          (tagIds) => {
            const questionData = {
              "date": new Date().toJSON(),
              "status": "publish",
              "title": otsikko,
              "content": this.html,
              "tags": tagIds
            }

            return this.kysymysService.lisaaKysymys(questionData as UusiKysymys)
          }
        )
      )
      .subscribe((vastaus: any) => {
        this.reititin.navigate([`detail/${vastaus.id}`]);
      });
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with response: ' + this.captcha)
  }

  ngOnInit(): void {
    this.kysymykset$ = this.hakuTermit.pipe(
      // odota 300ms jokaisen painalluksen jälkeen ennen termin käsittelyä
      debounceTime(300),

      // jätä termi huomiotta jos sama kuin edellinen
      distinctUntilChanged(),

      // vaihda uuteen Observableen joka kerta kun termi muuttuu
      switchMap((termi: string) => this.kysymysService.haeEhdottavalleHakujarjestelmalle(termi))
    )
  }

}
