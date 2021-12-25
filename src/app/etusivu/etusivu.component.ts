import { Component, OnInit } from '@angular/core';
import { Kysymys } from '../kysymys';
import { KysymysService } from '../kysymys.service';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css']
})
export class EtusivuComponent implements OnInit {

  constructor(private kysymysService: KysymysService) { }

  kysymykset: Kysymys[] = [];

  haeKysymykset(): void {
    this.kysymysService.haeKysymykset()
        .subscribe(kysymykset => this.kysymykset = kysymykset);
  }

  ngOnInit(): void {
    this.haeKysymykset();
  }

}
