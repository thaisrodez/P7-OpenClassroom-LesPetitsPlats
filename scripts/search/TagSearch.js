class TagSearch {
  constructor(tagsData, recipes) {
    this._tagsData = tagsData;
    this._recipes = recipes;
    this.matchingRecipes = [];
  }

  getRecipies() {
    if (this.matchingRecipes.length) return this.matchingRecipes;
    return this._recipes;
  }

  ingredientSearch(tag) {
    this.matchingRecipes = this.getRecipies().filter((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      return ingredients.includes(tag);
    });
    return this.matchingRecipes;
  }

  applianceSearch(tag) {
    this.matchingRecipes = this.getRecipies().filter((recipe) => {
      return recipe.appliance === tag;
    });
    return this.matchingRecipes;
  }

  ustensilSearch(tag) {
    this.matchingRecipes = this.getRecipies().filter((recipe) => {
      return recipe.ustensils.includes(tag);
    });
    return this.matchingRecipes;
  }

  tagSearch() {
    if (this._tagsData.length) {
      this._tagsData.forEach((tagData) => {
        switch (tagData.type) {
          case "ingredient":
            this.ingredientSearch(tagData.tag);
            break;
          case "appliance":
            this.applianceSearch(tagData.tag);
            break;
          case "ustensil":
            this.ustensilSearch(tagData.tag);
            break;
        }
      });
      return this.matchingRecipes;
    }
    return this._recipes;
  }
}
