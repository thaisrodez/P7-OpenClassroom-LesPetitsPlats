class Recipe {
  constructor(recipe) {
    this._recipe = recipe;
    this.$wrapper = document.createElement("div");

    this.$wrapper.classList.add("recipe-wrapper");
  }

  // format ingredient unit
  formatUnit(unit) {
    if (unit === "grammes") return "g";
    return unit;
  }

  // get ingredients
  getIngredients() {
    const { ingredients } = this._recipe;
    let ingredientsHTML = "";

    ingredients.forEach((ingredient) => {
      ingredientsHTML += "<div>";
      ingredientsHTML += `<span class="ingredient-name">${
        ingredient.ingredient + (ingredient.quantity ? ":" : "")
      }</span>`;
      if (ingredient.quantity) {
        ingredientsHTML += `<span class="ingredient-value"> ${ingredient.quantity}`;
        ingredientsHTML += ingredient.unit
          ? ` ${this.formatUnit(ingredient.unit)}</span>`
          : "</span>";
      }
      ingredientsHTML += "</div>";
    });
    return ingredientsHTML;
  }

  createRecipeCard() {
    const recipeArticle = `
    <article class="card">
      <img src="https://source.unsplash.com/random/380×178/?food" class="card-img-top" />
      <div class="card-body">
        <div>
          <h5 class="card-title">${this._recipe.name}</h5>
          <div class="ingredients-wrapper">
            ${this.getIngredients()}
          </div>
        </div>
        <div>
          <p class="recipe-time">
            <i class="fa-regular fa-clock"></i>
            ${this._recipe.time} min
          </p>
          <p class="card-text recipe-description">
            ${this._recipe.description}
          </p>
        </div>
      </div>
    </article>
    `;

    this.$wrapper.innerHTML = recipeArticle;

    return this.$wrapper;
  }
}
