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
    this.matchingRecipes = this._recipes.filter((recipe) => {
      const { name } = recipe;
      const { description } = recipe;
      const ingredientsString = this.ingredientsToString(recipe);
      const regex = new RegExp(this._input.toLowerCase(), "i");
      if (name.toLowerCase().search(regex) != -1) return true;
      if (description.search(regex) != -1) return true;
      if (ingredientsString.search(regex) != -1) return true;
    });
    return this.matchingRecipes;
  }
}
