/* global RecipiesApi, Dropdown, Recipe, Search, Tag, GetTag, TagSearch */

class App {
  constructor() {
    this.data = new RecipiesApi("data/recipes.json");
    this.$tagsWrapper = document.querySelector(".tags-wrapper");
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
    this.$searchWrapper = document.querySelector(".search-wrapper");

    this.searchInput = "";
    this.recipesData = [];
    this.tagsData = [];
    this.ingredientsData = [];
    this.appliancesData = [];
    this.ustensilsData = [];
  }

  async getRecipies() {
    const recipes = await this.data.getRecipies();
    return recipes;
  }

  // display Recipes card
  displayRecipes() {
    if (this.recipesData.length) {
      this.recipesData.forEach((recipe) => {
        const recipeTemplate = new Recipe(recipe);
        this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard());
      });
    } else {
      this.$recipesWrapper.innerHTML =
        "<p>Aucune recette ne correspond à votre recherche</p>";
    }
  }

  // display one dropDown filter
  displayDropdown(data, id) {
    const template = new Dropdown(data, id);
    this.$searchWrapper.appendChild(template.createDropdown());
  }

  // display all dropdowns filters
  displayDropdowns() {
    this.displayDropdown(this.ingredientsData, "ingredients");
    this.displayDropdown(this.appliancesData, "appliances");
    this.displayDropdown(this.ustensilsData, "ustensils");
  }

  // search
  search() {
    const search = new Search(this.searchInput, this.recipesData);
    this.recipesData = search.search();
    this.$recipesWrapper.innerHTML = "";
    this.displayRecipes();
    this.getTags();
    this.$searchWrapper.innerHTML = "";
    this.displayDropdowns();
    this.handleFilters();
    this.deleteTag();
  }

  // handle main search
  handleMainSearch() {
    const mainSearchBar = document.getElementById("main-searchbar");
    mainSearchBar.addEventListener("keyup", (e) => {
      if (e.target.value.length >= 3) {
        this.searchInput = e.target.value;
        this.search();
      }
    });
  }

  // handle tag search and display tag
  handleFilters() {
    const tagsFilter = document.querySelectorAll(".dropdown-item");
    tagsFilter.forEach((tagFilter) => {
      tagFilter.addEventListener("click", (e) => {
        const tagValue = e.target.innerHTML;
        const tagType = e.target.dataset.type;
        // display tagFilter
        const tag = new Tag(tagValue, tagType);
        this.$tagsWrapper.appendChild(tag.getTag());

        // how to pass several tags ? with an array ?
        const tagObject = { tag: tagValue, type: tagType };
        this.tagsData.push(tagObject);
        this.tagsSearch(this.recipesData);
        // delete tag filter
        this.deleteTag();
      });
    });
  }

  tagsSearch(recipes) {
    const tagSearch = new TagSearch(this.tagsData, recipes);
    this.recipesData = tagSearch.tagSearch();
    this.$recipesWrapper.innerHTML = "";
    this.displayRecipes();
    this.getTags();
    this.$searchWrapper.innerHTML = "";
    this.displayDropdowns();
    this.search();
  }

  // get tags list
  getTags() {
    const getTag = new GetTag(this.recipesData);
    this.ingredientsData = getTag.getIngredients();
    this.appliancesData = getTag.getAppliances();
    this.ustensilsData = getTag.getUstensils();
  }

  async deleteTag() {
    const fullRecipes = await this.getRecipies();
    const tags = document.querySelectorAll(".tag-wrapper");
    tags.forEach((tag) => {
      tag.querySelector("i").addEventListener("click", () => {
        // delete tag from search filters and relaunch filters and search
        this.tagsData = this.tagsData.filter((t) => t.tag !== tag.dataset.tag);
        // remove tag
        if (document.getElementById(`${tag.dataset.tag}`)) {
          document.getElementById(`${tag.dataset.tag}`).remove();
        }
        // launch search again
        this.tagsSearch(fullRecipes);
        this.handleMainSearch;
      });
    });
  }

  async main() {
    // get search filters data
    this.ingredientsData = await this.data.getIngredients();
    this.appliancesData = await this.data.getAppliances();
    this.ustensilsData = await this.data.getUstensils();
    // display filters
    this.displayDropdowns();

    // display recipes
    this.recipesData = await this.getRecipies();
    this.displayRecipes();

    // main search
    this.handleMainSearch();

    // tag search
    this.handleFilters();
  }
}

const app = new App();
app.main();
