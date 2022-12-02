class Search {
  constructor(input, recipes) {
    this._input = input;
    this._recipes = recipes;
    this.matchingRecipes = [];
  }

  ingredientsToString(recipe) {
    const { ingredients } = recipe;
    let string = "";
    for (const ingredient of ingredients) {
      string += ingredient.ingredient.toLowerCase();
    }
    return string;
  }

  // search in title, ingredients, description
  search() {
    for (const recipe of this._recipes) {
      const { name } = recipe;
      const { description } = recipe;
      const ingredientsString = this.ingredientsToString(recipe);
      const regex = new RegExp(this._input, "i");
      if (name.search(regex) != -1) {
        this.matchingRecipes.push(recipe);
      } else if (description.search(regex) != -1) {
        this.matchingRecipes.push(recipe);
      } else if (ingredientsString.search(regex) != -1) {
        this.matchingRecipes.push(recipe);
      }
    }
    return this.matchingRecipes;
  }
}
