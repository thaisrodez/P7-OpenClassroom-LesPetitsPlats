class Dropdown {
  constructor(data, id) {
    this.$dropdownWrapper = document.createElement("div");
    this.$dropdownWrapper.classList.add("filters");

    this._data = data;
    this._id = id;
  }

  getStyle() {
    const dropdownMenu = this.$dropdownWrapper.querySelector(".dropdown-menu");
    const dropdownBtn = this.$dropdownWrapper.querySelector(".btn");
    if (dropdownMenu.classList.contains("show")) {
      dropdownBtn.classList.add("two-sides-radius");
    } else {
      dropdownBtn.classList.remove("two-sides-radius");
    }
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

  getPlaceholder() {
    switch (this._id) {
      case "ingredients":
        return "Rechercher un ingrédient";
      case "ustensils":
        return "Rechercher un ustensil";
      case "appliances":
        return "Rechercher un appareil";
    }
  }

  getInputId() {
    switch (this._id) {
      case "ingredients":
        return "filter-ingredients";
      case "ustensils":
        return "filter-ustensils";
      case "appliances":
        return "filter-appliances";
    }
  }

  // get dropdown list elements
  getElements() {
    let elementsHTML = "";
    this._data.forEach((element) => {
      elementsHTML += `<a class="dropdown-item text-white" href="#">${element}</a>`;
    });
    return elementsHTML;
  }

  createDropdown() {
    const dropDown = `
    <div class="btn-group " id=${this._id}>
      <button type="button" class="btn dropdown-toggle filter-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${this.getTitle()}
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <input type="text"
          id=${this.getInputId()}
          placeholer=${this.getPlaceholder()}
          class="filters-input"
          />
          <div class="dropdown-grid">
            ${this.getElements()}
          </div>
        </div>
      </div>
    </div>
    `;

    this.$dropdownWrapper.innerHTML = dropDown;

    this.getStyle();

    return this.$dropdownWrapper;
  }
}
