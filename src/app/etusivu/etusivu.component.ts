import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';
import { Observable, forkJoin, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css']
})
export class EtusivuComponent implements OnInit {

  constructor(
    private kysymysService: KysymysService,
    private reitti: ActivatedRoute
  ) {
    
    this.yhdistettyArray$ = this.reitti.params.pipe(
      switchMap((params) => {
        if (!params.page) {
          return of([]);
        }
        this.nykyinenSivu = +params.page;
        this.jarjestys = params.orderby;
        this.laskevaNouseva = params.order;
        return from(this.haeKysymykset(+params.page, params.orderby, params.order));
      })
    );
  }

  laskuri: string;
  sivumaara: number;
  nykyinenSivu: number;
  jarjestys: string;
  laskevaNouseva: string;
  yhdistettyArray$: Observable<any>;

  haeKysymykset(sivu: number, jarjestys: string, laskevaNouseva: string): Observable<any> {
    return this.kysymysService.haeKysymykset(sivu, jarjestys, laskevaNouseva).pipe(
      switchMap((kysymykset: Kysymys[]) => {
        const tagiIDt = kysymykset.map((kysymys) => kysymys.tags).join(',');
        const kysymysIDt = kysymykset.map((kysymys) => kysymys.id).join(',');

        return forkJoin({
          questions: of(kysymykset),
          tags: this.kysymysService.haeAvainSanat(tagiIDt),
          comments: this.kysymysService.haeVastaukset(kysymysIDt),
        });
      }),
      map(({ questions, tags, comments }) => {
        const yhdistettyArray = questions.map((kysymys) => {
          return {
            ...kysymys,
            tag_names: kysymys.tags
              .map((tagi_ID) => tags.find((tagi) => tagi.id == tagi_ID)?.name)
              .filter((onOlemassa) => !!onOlemassa),
            comments: comments.filter((vastaus) => vastaus.post === kysymys.id),
          };
        });

        for (let kysymys of yhdistettyArray) {
          kysymys.title.truncated = this.lyhenna(kysymys.title.rendered, 100)
          kysymys.excerpt.truncated = this.lyhenna(kysymys.excerpt.rendered, 275)
        }

        return yhdistettyArray;
      })
    );
  }

  lyhenna(merkkijono: string, n: number) {
    return (merkkijono.length > n) ? merkkijono.substr(0, n - 1) + '...' : merkkijono;
  };


  haeKysymystenMaara(): void {
    this.kysymysService.haeHeaderit().subscribe(kysymykset => {
      this.laskuri = kysymykset.headers.get('X-WP-Total');
      this.sivumaara = +kysymykset.headers.get('X-WP-TotalPages');
    });
  }

  ngOnInit(): void {
    this.haeKysymystenMaara();

  }

}
