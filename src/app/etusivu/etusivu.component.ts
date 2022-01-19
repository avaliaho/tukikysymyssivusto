import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css']
})
export class EtusivuComponent implements OnInit {

  constructor(private kysymysService: KysymysService) { }

  yhdistettyArray: Kysymys[] = [];
  laskuri: string;

  haeKysymykset(): void {
    this.kysymysService
      .haeKysymykset()
      .pipe(
        switchMap((kysymykset: Kysymys[]) => {
          const idt = kysymykset.map((kysymys) => kysymys.tags)
            .join(',') // Kutsutaan avainsana-APIa ID:illä
          return this.kysymysService
            .haeAvainSanat(idt)
            .pipe(map((tagit) => ({ kysymykset, tagit })))
        })
      )
      .subscribe(({ kysymykset, tagit }) => {
        const yhdistettyArray = kysymykset.map((k) => {
          return {
            ...k,
            tag_names: k.tags
              .map((tagiId) => tagit.find((x) => x.id == tagiId)?.name)
              .filter((onOlemassa) => !!onOlemassa)
          };
        });

        this.yhdistettyArray = yhdistettyArray;

        for (let kysymys of this.yhdistettyArray) {
          kysymys.title.rendered = this.lyhenna(kysymys.title.rendered, 75)
          kysymys.excerpt.rendered = this.lyhenna(kysymys.excerpt.rendered, 300)
        }
      })
  }

  lyhenna(merkkijono: string, n: number) {
    return (merkkijono.length > n)
      ? merkkijono.substr(0, n - 1) + '...' : merkkijono;
  };

  
  haeKysymystenMaara(): void {
    this.kysymysService.haeHeaderit()
      .subscribe(kysymykset => {
        this.laskuri = kysymykset.headers.get('X-WP-Total');
      });
  }

  ngOnInit(): void {
    this.haeKysymykset();
    this.haeKysymystenMaara();
  }

}
