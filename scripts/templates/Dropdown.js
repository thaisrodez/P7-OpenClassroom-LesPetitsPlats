class Dropdown {
  constructor(data, id) {
    this.$dropdownWrapper = document.createElement("div");
    this.$dropdownWrapper.classList.add("filters");

    this._data = data;
    this._id = id;
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
      elementsHTML += `<a class="dropdown-item text-white" href="#">${element}</a>`;
    });
    return elementsHTML;
  }

  onBtnClick() {
    const btn = this.$dropdownWrapper.querySelector(".btn");
    btn.addEventListener("click", (e) => {
      if (btn.getAttribute("aria-expanded")) {
        const dropdownMenu =
          this.$dropdownWrapper.querySelector(".dropdown-menu");
        console.log(dropdownMenu.clientWidth);
        e.target.innerHTML = this.getInput();
      } else {
        btn.innerHTML = "";
        btn.textContent = this.getTitle();
      }
    });
  }

  createDropdown() {
    const dropDown = `
    <div class="btn-group " id=${this._id}>
      <button type="button" class="btn dropdown-toggle filter-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${this.getTitle()}
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <div class="dropdown-grid">
            ${this.getElements()}
          </div>
        </div>
      </div>
    </div>
    `;

    this.$dropdownWrapper.innerHTML = dropDown;
    this.onBtnClick();

    return this.$dropdownWrapper;
  }
}
