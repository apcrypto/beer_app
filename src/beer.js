class Beer {
  constructor(data) {
  this.id = data.id;
  this.name = data.name;
  this.brewery = data.brewery;
  this.region = data.region;
  this.style = data.style;
  this.review = data.review;
  this.image = data.image;
  this.likes = data.likes;
  Beer.all.push(this);
  }

  renderBeers() {
    return `
    <div class="card">
      <h2>${this.name}</h2>
      <img src=${this.image} class="beer-avatar" />
      <p>Brewery: ${this.brewery}</P>
      <p>Region: ${this.region}</P>
      <p>Style: ${this.style}</P>
      <p>Likes: ${this.likes}</p>
      <button data-id="${this.id}" class="like-btn">Like beer</button>
    </div>`;
  }

}

Beer.all = [];
