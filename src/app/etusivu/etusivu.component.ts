import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css']
})
export class EtusivuComponent implements OnInit {

  constructor(private kysymysService: KysymysService) { }

  kysymykset: Kysymys[] = [];
  kysymysTagienIdt: number[] = [];
  laskuri: string;

  haeKysymykset(): void {
    this.kysymysService.haeKysymykset()
      .subscribe(kysymykset => {
        this.kysymykset = [...kysymykset.body!];
        this.laskuri = kysymykset.headers.get('X-WP-Total');

        for (let kysymys of kysymykset.body) {
          for (let i = 0; i < kysymys.tags.length; i++) {
            if (!this.kysymysTagienIdt.includes(Number(kysymys.tags[i]))) {
              this.kysymysTagienIdt.push(Number(kysymys.tags[i]));
            }
          }
        }
        console.log(this.kysymysTagienIdt)
      });
  }

  ngOnInit(): void {
    this.haeKysymykset();
  }

}
