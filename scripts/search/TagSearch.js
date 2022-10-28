class TagSearch {
  constructor(tagsData, recipes) {
    this._tagsData = tagsData;
    this._recipes = recipes;
    this.matchingRecipes = [];
  }

  ingredientSearch() {
    this._recipes.map((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      if (ingredients.includes(this._tag)) {
        this.matchingRecipes.push(recipe);
      }
    });
    return this.matchingRecipes;
  }

  applianceSearch() {
    this._recipes.map((recipe) => {
      if (recipe.appliance === this._tag) {
        this.matchingRecipes.push(recipe);
      }
    });
    return this.matchingRecipes;
  }

  ustensilSearch() {
    this._recipes.map((recipe) => {
      if (recipe.ustensils.includes(this._tag)) {
        this.matchingRecipes.push(recipe);
      }
    });
    return this.matchingRecipes;
  }

  tagSearch() {
    this.matchingRecipes = this._tagsData.map((tagData) => {
      switch (tagData.type) {
        case "ingredient":
          this.matchingRecipes = this.ingredientSearch();
          break;
        case "appliance":
          this.matchingRecipes = this.applianceSearch();
          break;
        case "ustensil":
          this.matchingRecipes = this.ustensilSearch();
          break;
      }
    });
    return this.matchingRecipes;
  }
}
