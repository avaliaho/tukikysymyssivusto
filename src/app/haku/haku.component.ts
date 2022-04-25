import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-haku',
  templateUrl: './haku.component.html',
  styleUrls: ['./haku.component.css']
})
export class HakuComponent implements OnInit {

  constructor(
    private kysymysService: KysymysService,
    private reitti: ActivatedRoute,
    private reititin: Router
  ) {
    // pakota reitin uudelleenlataus kun parametrit muuttuvat
    this.reititin.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  laskuri: number;
  sivumaara: number;
  nykyinenSivu: number;
  hakutermi: string;
  kysymykset: Kysymys[] = [];

  haeKysymyksetHakusanalla(hakutermi: string, sivu: number): void {
    this.kysymysService.haeKysymyksetHakusanalla(hakutermi, sivu)
      .subscribe(data => {
        this.kysymykset = data;
      });
  }

  haeKysymystenMaara(hakutermi: string): void {
    this.kysymysService.haeHeaderitHakusanalla(hakutermi).subscribe(kysymykset => {
      this.laskuri = +kysymykset.headers.get('X-WP-Total');
      this.sivumaara = +kysymykset.headers.get('X-WP-TotalPages');
    });
  }

  ngOnInit(): void {
    this.hakutermi = this.reitti.snapshot.paramMap.get('term');
    this.nykyinenSivu = +this.reitti.snapshot.paramMap.get('page');
    this.haeKysymystenMaara(this.hakutermi);
    this.haeKysymyksetHakusanalla(this.hakutermi, this.nykyinenSivu);
  }

}
