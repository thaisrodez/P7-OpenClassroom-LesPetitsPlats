class Tag {
  constructor(tag, type) {
    this._tag = tag;
    this._type = type;

    this.$tagwrapper = document.createElement("div");
    this.$tagwrapper.classList.add("tag-wrapper");
    this.$tagwrapper.setAttribute("id", this._tag);

    this.$tagwrapper.setAttribute("data-type", this._type);
    this.$tagwrapper.setAttribute("data-tag", this._tag);
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
     <p>${this._tag}</p>
     <i class="fa-regular fa-circle-xmark"></i>
    `;

    this.$tagwrapper.innerHTML = tagParagraph;
    this.getStyle();

    return this.$tagwrapper;
  }
}
