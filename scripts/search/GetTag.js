class GetTag {
  constructor(recipes) {
    this._recipes = recipes;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getIngredients() {
    const ingredients = this._recipes.map((recipe) => {
      return recipe.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      );
    });
    this.ingredients = ingredients.flat().filter(this.onlyUnique);

    return this.ingredients;
  }

  getAppliances() {
    const appliances = this._recipes.map((recipe) => {
      return recipe.appliance.toLowerCase();
    });
    this.appliances = appliances.filter(this.onlyUnique);

    return this.appliances;
  }

  getUstensils() {
    const ustensils = this._recipes.map((recipe) => {
      return recipe.ustensils.map((ustensil) => ustensil.toLowerCase());
    });
    this.ustensils = ustensils.flat().filter(this.onlyUnique);

    return this.ustensils;
  }
}
