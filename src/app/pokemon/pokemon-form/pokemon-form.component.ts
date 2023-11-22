import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";

@Component({
    selector: 'app-pokemon-form',
    templateUrl: './pokemon-form.component.html',
    styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

    @Input() pokemon: Pokemon;
    types: string[];
    isAddForm: boolean;

    constructor(
      private pokemonService: PokemonService,
      private router: Router
    ) {
    }

    ngOnInit(): void {
        this.types = this.pokemonService.getPokemonTypeList();
        this.isAddForm = this.router.url.includes('add');
    }

    hasType(type: string): boolean {
        return this.pokemon.types.includes(type);
    }

    selectType($event: Event, type: string) {
        const isChecked = ($event.target as HTMLInputElement).checked

        if (isChecked) {
            this.pokemon.types.push(type);
        } else {
            const index = this.pokemon.types.indexOf(type);
            this.pokemon.types.splice(index, 1);
        }
    }

    isTypesValid(type: string): boolean {
        //If our pokemon has only 1 type checked && we try to uncheck, forbid unchecking (because we need at least 1 type)
        if (this.pokemon.types.length == 1 && this.hasType(type)) {
            return false;
        }

        //If our pokemon already has 3 types, forbid checking other types that he doesn't yet have
        if (this.pokemon.types.length > 2 && !this.hasType(type)) {
            return false;
        }

        return true;
    }

    onSubmit() {
        if(this.isAddForm)
        {
            this.pokemonService.addPokemon(this.pokemon)
              .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]))
        } else {
            this.pokemonService.updatePokemon(this.pokemon)
              .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
        }
    }

}
