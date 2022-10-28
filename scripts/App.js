/* global RecipiesApi, Dropdown, Recipe, Search */

class App {
  constructor() {
    this.data = new RecipiesApi("data/recipes.json");
    this.$tagsWrapper = document.querySelector(".tags-wrapper");
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
    this.$searchWrapper = document.querySelector(".search-wrapper");

    this.recipesData = [];
  }

  displayRecipes() {
    this.recipesData.forEach((recipe) => {
      const recipeTemplate = new Recipe(recipe);
      this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard());
    });
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

    this.recipesData = await this.data.getRecipies();
    console.log(this.recipesData);

    this.displayRecipes();

    // main search
    const mainSearchBar = document.getElementById("main-searchbar");
    mainSearchBar.addEventListener("keyup", (e) => {
      if (e.target.value.length >= 3) {
        const search = new Search(e.target.value, this.recipesData);
        this.recipesData = search.search();
        this.$recipesWrapper.innerHTML = "";
        this.displayRecipes();
      }
    });
  }
}

const app = new App();
app.main();
