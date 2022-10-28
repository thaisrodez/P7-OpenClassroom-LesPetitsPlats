/* global RecipiesApi, Dropdown, Recipe, Search, TagSearch */

class App {
  constructor() {
    this.data = new RecipiesApi("data/recipes.json");
    this.$tagsWrapper = document.querySelector(".tags-wrapper");
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
    this.$searchWrapper = document.querySelector(".search-wrapper");

    this.recipesData = [];
    this.ingredientsData = [];
    this.appliancesData = [];
    this.ustensilsData = [];
  }

  displayRecipes() {
    this.recipesData.forEach((recipe) => {
      const recipeTemplate = new Recipe(recipe);
      this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard());
    });
  }

  displayDropdown(data, id) {
    const template = new Dropdown(data, id);
    this.$searchWrapper.appendChild(template.createDropdown());
  }

  async main() {
    // get search filters data
    this.ingredientsData = await this.data.getIngredients();
    this.appliancesData = await this.data.getAppliances();
    this.ustensilsData = await this.data.getUstensils();
    // display filters
    this.displayDropdown(this.ingredientsData, "ingredients");
    this.displayDropdown(this.appliancesData, "appliances");
    this.displayDropdown(this.ustensilsData, "ustensils");

    // display recipes
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
        const tagsSearch = new TagSearch(this.recipesData);
        this.ingredientsData = tagsSearch.getIngredients();
        this.appliancesData = tagsSearch.getAppliances();
        this.ustensilsData = tagsSearch.getUstensils();
        this.$searchWrapper.innerHTML = "";
        this.displayDropdown(this.ingredientsData, "ingredients");
        this.displayDropdown(this.appliancesData, "appliances");
        this.displayDropdown(this.ustensilsData, "ustensils");
      }
    });
  }
}

const app = new App();
app.main();
