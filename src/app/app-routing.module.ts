import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';

const reitit: Routes = [
  { path: 'questions/:page/:orderby/:order', component: EtusivuComponent },
  { path: '', redirectTo: '/questions/1/date/desc', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(reitit)],
  exports: [RouterModule]
})
export class AppRoutingModule { }