import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel asuu täällä
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { HakuComponent } from './haku/haku.component';

@NgModule({
  declarations: [
    AppComponent,
    EtusivuComponent,
    HakuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // ei tarvitse laittaa yhtään provideria johtuen 'providedIn'-flagistä
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
