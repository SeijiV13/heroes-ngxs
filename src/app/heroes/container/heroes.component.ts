import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { GetHeroById, GetHeroes } from "../hero.action";
import { HeroState } from "../hero.state";
import { Observable } from "rxjs";
import { Hero } from "../hero.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  editItemUrl: string = "/heroes/edit-hero/";
  newItemForm: FormGroup;
  isShowNewItemForm: boolean = false;

  @Select(HeroState.getHeroList)
  list$: Observable<Hero[]>;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.formBuilderInit();
    this.store.dispatch(new GetHeroes());
  }

  onSubmit() {}

  showNewItemForm() {
    this.isShowNewItemForm = !this.isShowNewItemForm;
  }

  cancelForm() {
    this.isShowNewItemForm = !this.isShowNewItemForm;
  }

  removeItem(hero: Hero) {
    const isConfirmed = confirm(`Delete ${hero.firstName}`);
    if (!isConfirmed) return;

    //TODO: DeleteHero
  }

  private formBuilderInit(): void {
    this.newItemForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      house: [""],
      knownAs: [""]
    });
  }
}
