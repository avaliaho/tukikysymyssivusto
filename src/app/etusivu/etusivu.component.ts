import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css']
})
export class EtusivuComponent implements OnInit {

  constructor(private kysymysService: KysymysService) { }

  laskuri: string;
  yhdistettyArray$: Observable<any>;

  haeKysymykset(): Observable<any> {
    return this.kysymysService.haeKysymykset().pipe(
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
          kysymys.title.rendered = this.lyhenna(kysymys.title.rendered, 100)
          kysymys.excerpt.rendered = this.lyhenna(kysymys.excerpt.rendered, 300)
        }

        return yhdistettyArray;
      })
    );
  }

  lyhenna(merkkijono: string, n: number) {
    return (merkkijono.length > n) ? merkkijono.substr(0, n - 1) + '...' : merkkijono;
  };


  haeKysymystenMaara(): void {
    this.kysymysService.haeHeaderit()
      .subscribe(kysymykset => {
        this.laskuri = kysymykset.headers.get('X-WP-Total');
      });
  }

  ngOnInit(): void {    
    this.haeKysymystenMaara();
    this.yhdistettyArray$ = this.haeKysymykset();
  }

}
