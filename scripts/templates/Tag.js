class Tag {
  constructor(tag, type) {
    this._tag = tag;
    this._type = type;

    this.$tagwrapper = document.createElement("div");
    this.$tagwrapper.classList.add("tag-wrapper");
  }

  getStyle() {
    switch (this._type) {
      case "ingredient":
        this.$tagwrapper.classList.add("blue-bg");
        break;
      case "appliance":
        this.$tagwrapper.classList.add("green-bg");
        break;
      case "ustensil":
        this.$tagwrapper.classList.add("red-bg");
        break;
    }
  }

  getTag() {
    const tagParagraph = `
     <p>${this._tag} <i class="fa-regular fa-circle-xmark"></i></p>
    `;

    this.$tagwrapper.innerHTML = tagParagraph;
    this.getStyle();

    return this.$tagwrapper;
  }
}
