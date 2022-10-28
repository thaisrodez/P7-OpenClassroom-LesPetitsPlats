class Api {
  constructor(url) {
    this._url = url;
  }

  async get() {
    try {
      const res = await fetch(this._url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

class RecipiesApi extends Api {
  constructor(url) {
    super(url);
  }

  async getRecipies() {
    const apiData = await this.get();
    return apiData;
  }

  async getIngredients() {
    const apiData = await this.get();
    const ingredients = apiData.map((recipe) => {
      return recipe.ingredients.map((ingredient) => ingredient.ingredient);
    });

    const filteredIngredients = ingredients.flat().filter(onlyUnique);

    return filteredIngredients;
  }

  async getAppliances() {
    const apiData = await this.get();
    const appliances = apiData.map((recipe) => {
      return recipe.appliance;
    });

    const filteredAppliances = appliances.filter(onlyUnique);

    return filteredAppliances;
  }

  async getUstensils() {
    const apiData = await this.get();
    const ustensils = apiData.map((recipe) => {
      return recipe.ustensils;
    });

    const filteredUstensils = ustensils.flat().filter(onlyUnique);

    return filteredUstensils;
  }
}
