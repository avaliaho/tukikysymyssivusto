import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
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

    this.yhdistetty$ = this.reitti.params.pipe(
      switchMap((params) => {
        if (!params.id) {
          return of([]);
        }
        return from(this.haeKysymys(+params.id));
      })
    );

  }

  yhdistetty$: Observable<any>;

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

  ngOnInit(): void {
  }

}
