class Dropdown {
  constructor(data, id) {
    this._data = data;
    this._id = id;

    this.$dropdownWrapper = document.createElement("div");
    this.$dropdownWrapper.classList.add("filters");
    // this.$dropdownWrapper.setAttribute("id", this._id);
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
    const btn = this.$dropdownWrapper.querySelector(".dropdown-btn");
    btn.addEventListener("click", (e) => {
      const dropdown = this.$dropdownWrapper.querySelector(".dropdown-div");
      dropdown.classList.toggle("hidden");
      // if (btn.getAttribute("aria-expanded")) {
      //   e.target.innerHTML = this.getInput();
      // }
    });
  }

  createDropdown() {
    const dropDown = `
    <div class="dropdown-group" id=${this._id}>
      <button type="button" class="dropdown-btn" aria-haspopup="true" aria-expanded="false">
        ${this.getTitle()}
      </button>
      <div class="dropdown-div hidden">
          ${this.getInput()}
          <ul class="dropdown-elements" id='list-${this._id}'>
            ${this.getElements()}
          </ul>
      </div>
    </div>
    `;

    this.$dropdownWrapper.innerHTML = dropDown;
    this.onBtnClick();

    return this.$dropdownWrapper;
  }
}
