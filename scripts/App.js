/* global RecipiesApi, Dropdown, Recipe, Search, Tag, GetTag, TagSearch */

class App {
  constructor() {
    this.data = new RecipiesApi("data/recipes.json");
    this.$tagsWrapper = document.querySelector(".tags-wrapper");
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
    this.$searchWrapper = document.querySelector(".search-wrapper");

    this.recipesData = [];
    this.tagsData = [];
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
        const tagsSearch = new GetTag(this.recipesData);
        this.ingredientsData = tagsSearch.getIngredients();
        this.appliancesData = tagsSearch.getAppliances();
        this.ustensilsData = tagsSearch.getUstensils();
        this.$searchWrapper.innerHTML = "";
        this.displayDropdown(this.ingredientsData, "ingredients");
        this.displayDropdown(this.appliancesData, "appliances");
        this.displayDropdown(this.ustensilsData, "ustensils");
      }
    });

    // tag search
    const tagsFilter = document.querySelectorAll(".dropdown-item");
    for (const tagFilter of tagsFilter) {
      tagFilter.addEventListener("click", (e) => {
        const tagValue = e.target.innerHTML;
        const tagType = e.target.dataset.type;
        // display tagFilter
        const tag = new Tag(tagValue, tagType);
        this.$tagsWrapper.appendChild(tag.getTag());
        // delete tag filter

        // how to pass several tags ? with an array ?
        const tagObject = { tag: tagValue, type: tagType };
        this.tagsData.push(tagObject);
        const tagSearch = new TagSearch(tagsData, this.recipesData);
        this.recipesData = tagSearch.tagSearch();
        this.$recipesWrapper.innerHTML = "";
        this.displayRecipes();
      });
    }
  }
}

const app = new App();
app.main();
