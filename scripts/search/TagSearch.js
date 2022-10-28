class TagSearch {
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
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });

    this.ingredients = ingredients.flat().filter(onlyUnique);

    return this.ingredients;
  }

  getAppliances() {
    const appliances = this._recipes.map((recipe) => {
      return recipe.appliance;
    });

    this.appliances = appliances.filter(onlyUnique);

    return this.appliances;
  }

  getUstensils() {
    const ustensils = this._recipes.map((recipe) => {
      return recipe.ustensils;
    });

    this.ustensils = ustensils.flat().filter(onlyUnique);

    return this.ustensils;
  }
}
