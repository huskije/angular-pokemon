import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPokemonComponent} from "./pokemon/list-pokemon/list-pokemon.component";
import {DetailPokemonComponent} from "./pokemon/detail-pokemon/detail-pokemon.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


/* ALWAYS put the more global routes on the very bottom, more specific routes on top */
const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
