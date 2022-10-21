/* global RecipiesApi, Dropdown, Recipe */

class App {
  constructor() {
    this.data = new RecipiesApi("data/recipes.json");
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
    this.$searchWrapper = document.querySelector(".search-wrapper");
  }

  async main() {
    // get search filters data
    const ingredientsData = await this.data.getIngredients();
    const appliancesData = await this.data.getAppliances();
    const ustensilsData = await this.data.getUstensils();
    const ingredientSearchTemplate = new Dropdown(
      ingredientsData,
      "ingredients"
    );
    const applianceSearchTemplate = new Dropdown(appliancesData, "appliances");
    const ustensilsSearchTemplate = new Dropdown(ustensilsData, "ustensils");

    // insert filters in DOM
    this.$searchWrapper.appendChild(ingredientSearchTemplate.createDropdown());
    this.$searchWrapper.appendChild(applianceSearchTemplate.createDropdown());
    this.$searchWrapper.appendChild(ustensilsSearchTemplate.createDropdown());

    const recipesData = await this.data.getRecipies();
    console.log(recipesData);

    recipesData.forEach((recipe) => {
      const recipeTemplate = new Recipe(recipe);
      this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard());
    });
  }
}

const app = new App();
app.main();
