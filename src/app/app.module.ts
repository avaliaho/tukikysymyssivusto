import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel asuu täällä
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { HakuComponent } from './haku/haku.component';
import { YksityiskohtaComponent } from './yksityiskohta/yksityiskohta.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { UusiKysymysComponent } from './uusi-kysymys/uusi-kysymys.component';

@NgModule({
  declarations: [
    AppComponent,
    EtusivuComponent,
    HakuComponent,
    YksityiskohtaComponent,
    UusiKysymysComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    // ei tarvitse laittaa yhtään provideria johtuen 'providedIn'-flagistä
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
