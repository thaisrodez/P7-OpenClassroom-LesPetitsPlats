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

  // display Recipes card
  displayRecipes() {
    this.recipesData.forEach((recipe) => {
      const recipeTemplate = new Recipe(recipe);
      this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard());
    });
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

  // handle main search
  mainSearch() {
    const mainSearchBar = document.getElementById("main-searchbar");
    mainSearchBar.addEventListener("keyup", (e) => {
      if (e.target.value.length >= 3) {
        const search = new Search(e.target.value, this.recipesData);
        this.recipesData = search.search();
        this.$recipesWrapper.innerHTML = "";
        this.displayRecipes();
        this.getTags();
        this.$searchWrapper.innerHTML = "";
        this.displayDropdowns();
        this.tagSearch();
      }
    });
  }

  // handle tag search
  tagSearch() {
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
        const tagSearch = new TagSearch(this.tagsData, this.recipesData);
        this.recipesData = tagSearch.tagSearch();
        this.$recipesWrapper.innerHTML = "";
        this.getTags();
        this.displayRecipes();
        this.mainSearch();
        // delete tag filter
      });
    });
  }

  // get tags list
  getTags() {
    const getTag = new GetTag(this.recipesData);
    this.ingredientsData = getTag.getIngredients();
    this.appliancesData = getTag.getAppliances();
    this.ustensilsData = getTag.getUstensils();
  }

  // deleteTag() {
  //   const closeTagIcons =
  //     this.$tagsWrapper.querySelectorAll(".fa-circle-xmark");
  //   console.log(closeTagIcons);
  //   // delete tag from search filters
  //   // this.tagsData = this.tagsData.filter((t) => t.tag !== tagValue);
  //   // hide tag
  //   // launch search again
  // }

  async main() {
    // get search filters data
    this.ingredientsData = await this.data.getIngredients();
    this.appliancesData = await this.data.getAppliances();
    this.ustensilsData = await this.data.getUstensils();
    // display filters
    this.displayDropdowns();

    // display recipes
    this.recipesData = await this.data.getRecipies();
    this.displayRecipes();

    // main search
    this.mainSearch();

    // tag search
    this.tagSearch();

    // this.deleteTag();
  }
}

const app = new App();
app.main();
