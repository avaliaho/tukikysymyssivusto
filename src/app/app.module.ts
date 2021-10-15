import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel asuu täällä

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EtusivuComponent } from './etusivu/etusivu.component';

@NgModule({
  declarations: [
    AppComponent,
    EtusivuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
