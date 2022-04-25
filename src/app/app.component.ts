import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private reititin: Router) {
  }

  haku: string = "";

  meneHakuSivulle() {
    if (this.haku != "") {
      this.reititin.navigate([`search/${this.haku}/1`]);
    }
  }
}
