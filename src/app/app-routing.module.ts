import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';

const reitit: Routes = [
  { path: 'frontpage', component: EtusivuComponent },
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(reitit)],
  exports: [RouterModule]
})
export class AppRoutingModule { }