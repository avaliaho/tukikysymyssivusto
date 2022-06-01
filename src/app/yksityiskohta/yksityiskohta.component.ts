import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { Vastaus } from '../vastaus';
import { KysymysService } from '../kysymys.service';
import { Observable, forkJoin, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-yksityiskohta',
  templateUrl: './yksityiskohta.component.html',
  styleUrls: ['./yksityiskohta.component.css']
})
export class YksityiskohtaComponent implements OnInit {

  constructor(
    private kysymysService: KysymysService,
    private reitti: ActivatedRoute
  ) {

    this.captcha = '';

    this.yhdistetty$ = this.reitti.params.pipe(
      switchMap((params) => {
        if (!params.id) {
          return of([]);
        }
        this.id = +params.id;
        return from(this.haeKysymys(+params.id));
      })
    );

  }

  yhdistetty$: Observable<any>;
  vastaus: string = "";
  id: number;
  uusiKommentti: any;
  captcha: string;

  haeKysymys(id: number): Observable<any> {
    return this.kysymysService.haeKysymys(id).pipe(
      switchMap((kysymys: Kysymys) => {
        const tagiIDt = kysymys.tags.join(',');
        const kysymysID = +kysymys.id;

        const aputaulu = [];
        aputaulu.push(kysymys)

        return forkJoin({
          questions: of(aputaulu),
          tags: this.kysymysService.haeAvainSanat(tagiIDt),
          comments: this.kysymysService.haeYksityiskohdanVastaukset(kysymysID),
        });
      }),
      map(({ questions, tags, comments }) => {
        const yhdistetty = questions.map((kysymys) => {
          return {
            ...kysymys,
            tag_names: kysymys.tags
              .map((tagi_ID) => tags.find((tagi) => tagi.id == tagi_ID)?.name)
              .filter((onOlemassa) => !!onOlemassa),
            comments: comments.filter((vastaus) => vastaus.post === kysymys.id),
          };
        });

        return yhdistetty;
      })
    );
  }

  tallennaVastaus(kentanArvo: string) {
    this.vastaus = "";

    let vastausData = {
      "content": kentanArvo,
      "date": new Date().toJSON(),
      "post": this.id,
      "author_name": "root",
      "author_email": "aleksander.valiaho7@gmail.com"
    }

    if (!kentanArvo) { return; }
    this.kysymysService.lisaaVastaus(vastausData as Vastaus)
      .subscribe(vastaus => {
        this.uusiKommentti = vastaus;
      })
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with response: ' + this.captcha)
  }

}
