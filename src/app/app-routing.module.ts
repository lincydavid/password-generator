import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PalindromeComponent } from './palindrome.component';

const routes: Routes = [
  {
    path:'palindrome',
    component: PalindromeComponent,
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
