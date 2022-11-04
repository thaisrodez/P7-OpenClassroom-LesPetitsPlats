class Dropdown {
  constructor(data, id) {
    this._data = data;
    this._id = id;

    this.$dropdownWrapper = document.createElement("div");
    this.$dropdownWrapper.classList.add("btn-group", "filters");
    this.$dropdownWrapper.setAttribute("id", this._id);
  }

  getTitle() {
    switch (this._id) {
      case "ingredients":
        return "Ingrédients";
      case "ustensils":
        return "Ustensiles";
      case "appliances":
        return "Appareils";
    }
  }

  getInput() {
    switch (this._id) {
      case "ingredients":
        return `
        <input
          type="text"
          placeholder="Rechercher un ingrédients"
          id="filter-ingredients"
          class="filters-input"
          />
          `;
      case "ustensils":
        return `
        <input
          type="text"
          placeholder="Rechercher un ustensile"
          id="filter-ustensils"
          class="filters-input"
          />
          `;
      case "appliances":
        return `
        <input
          type="text"
          placeholder="Rechercher un appareil"
          id="filter-appliances"
          class="filters-input"
          />
          `;
    }
  }

  // get dropdown list elements
  getElements() {
    let elementsHTML = "";
    this._data.forEach((element) => {
      switch (this._id) {
        case "ingredients":
          elementsHTML += `<li class="dropdown-item text-white" data-type="ingredient">${element}</li>`;
          break;
        case "ustensils":
          elementsHTML += `<li class="dropdown-item text-white" data-type="ustensil">${element}</li>`;
          break;
        case "appliances":
          elementsHTML += `<li class="dropdown-item text-white" data-type="appliance">${element}</li>`;
          break;
      }
    });
    return elementsHTML;
  }

  onBtnClick() {
    const btn = this.$dropdownWrapper.querySelector(".btn");
    btn.addEventListener("click", (e) => {
      if (btn.getAttribute("aria-expanded")) {
        e.target.innerHTML = this.getInput();
      } else {
        btn.innerHTML = "";
        btn.textContent = this.getTitle();
      }
    });
  }

  createDropdown() {
    const dropDown = `
      <button type="button" class="btn dropdown-toggle filter-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${this.getTitle()}
      </button>
      <div class="dropdown-menu">
          <ul class="dropdown-grid">
            ${this.getElements()}
          </ul>
      </div>
    `;

    this.$dropdownWrapper.innerHTML = dropDown;
    // this.onBtnClick();

    return this.$dropdownWrapper;
  }
}
