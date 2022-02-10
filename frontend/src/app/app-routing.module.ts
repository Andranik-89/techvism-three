import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConeComponent } from './cone/cone.component';

const routes: Routes = [
  {
    path: '',
    component: ConeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
