import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';

const reitit: Routes = [
  { path: 'frontpage/:page', component: EtusivuComponent },
  { path: '', redirectTo: '/frontpage/1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(reitit)],
  exports: [RouterModule]
})
export class AppRoutingModule { }