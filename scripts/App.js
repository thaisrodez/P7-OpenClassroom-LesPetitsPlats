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

  // get all recipes data
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

  // display all search results
  displayResults() {
    this.$recipesWrapper.innerHTML = "";
    this.displayRecipes();
    this.getTags();
    this.$searchWrapper.innerHTML = "";
    this.displayDropdowns();
  }

  // search
  search() {
    const search = new Search(this.searchInput, this.recipesData);
    this.recipesData = search.search();
    this.displayResults();
    this.searchThroughTags();
    this.handleFilters();
    this.deleteTag();
  }

  // handle main search
  async handleMainSearch() {
    const fullRecipes = await this.getRecipies();
    const mainSearchBar = document.getElementById("main-searchbar");
    mainSearchBar.addEventListener("input", (e) => {
      this.searchInput = e.target.value;
      if (this.searchInput.length >= 3 && !this.tagsData.length) {
        // main search  and no tags
        this.recipesData = fullRecipes;
        this.search();
      } else if (this.searchInput.length >= 3 && this.tagsData.length) {
        // main search  and tags
        this.search();
      } else if (this.searchInput.length < 3 && this.tagsData.length) {
        // tags but no main search
        this.tagsSearch(fullRecipes);
      } else if (this.searchInput.length < 3 && !this.tagsData.length) {
        // no main search and no tags
        this.recipesData = fullRecipes;
        this.displayResults();
        this.searchThroughTags();
        this.handleFilters();
        this.deleteTag();
      }
    });
  }

  // handle search with tag and display tag
  async handleFilters() {
    const fullRecipes = await this.getRecipies();
    const tagsFilter = document.querySelectorAll(".dropdown-item");
    tagsFilter.forEach((tagFilter) => {
      tagFilter.addEventListener("click", (e) => {
        const tagValue = e.target.innerHTML;
        const tagType = e.target.dataset.type;
        const tagObject = { tag: tagValue, type: tagType };
        // check if object already exists in tagsData
        const isFound = this.tagsData.some((obj) => obj.tag === tagValue);
        if (!isFound) {
          // display tagFilter
          const tag = new Tag(tagValue, tagType);
          this.$tagsWrapper.appendChild(tag.getTag());

          this.tagsData.push(tagObject);
        }
        if (this.tagsData && !this.searchInput.length) {
          // tags but no main search
          this.tagsSearch(fullRecipes);
        } else {
          this.tagsSearch(this.recipesData);
        }
        // delete tag filter
        this.deleteTag();
      });
    });
  }

  tagsSearch(recipes) {
    const tagSearch = new TagSearch(this.tagsData, recipes);
    this.recipesData = tagSearch.tagSearch();
    this.displayResults();
    this.search();
    this.searchThroughTags();
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
        // remove tag from DOM
        if (document.getElementById(`${tag.dataset.tag}`)) {
          document.getElementById(`${tag.dataset.tag}`).remove();
        }
        // launch search again
        this.tagsSearch(fullRecipes);
        this.handleMainSearch;
      });
    });
  }

  refreshTagList(data, id, type) {
    const list = document.createElement("ul");
    list.setAttribute("id", `list-${id}`);
    list.classList.add("dropdown-elements");
    data.forEach((item) => {
      const li = document.createElement("li");
      li.setAttribute("data-type", type);
      li.classList.add("dropdown-item", "text-white");
      li.textContent = item;
      list.appendChild(li);
    });
    const formerList = document.getElementById(`list-${id}`);
    formerList.replaceWith(list);
  }

  searchThroughTags() {
    const filtersInput = document.querySelectorAll(".filters-input");
    filtersInput.forEach((input) => {
      input.addEventListener("keyup", (e) => {
        const regex = new RegExp(e.target.value, "i");
        switch (input.getAttribute("id")) {
          case "filter-ingredients": {
            const ingredientsData = this.ingredientsData.filter(
              (ingredient) => {
                return ingredient.search(regex) != -1;
              }
            );
            this.refreshTagList(ingredientsData, "ingredients", "ingredient");
            this.handleFilters();
            break;
          }
          case "filter-appliances": {
            const appliancesData = this.appliancesData.filter((appliance) => {
              return appliance.search(regex) != -1;
            });
            this.refreshTagList(appliancesData, "appliances", "appliance");
            this.handleFilters();
            break;
          }
          case "filter-ustensils": {
            const ustensilsData = this.ustensilsData.filter((ustensil) => {
              return ustensil.search(regex) != -1;
            });
            this.refreshTagList(ustensilsData, "ustensils", "ustensil");
            this.handleFilters();
            break;
          }
        }
      });
    });
  }

  async main() {
    // get search filters data
    this.ingredientsData = await this.data.getIngredients();
    this.appliancesData = await this.data.getAppliances();
    this.ustensilsData = await this.data.getUstensils();
    // get reciped data
    this.recipesData = await this.getRecipies();

    // display first layout
    this.displayResults();

    // main search
    this.handleMainSearch();

    // search for a tag
    this.searchThroughTags();

    // select tag search
    this.handleFilters();
  }
}

const app = new App();
app.main();
