class App {

  constructor() {
    this.adapter = new Adapter();
    this.createBeers = this.createBeers.bind(this);
    this.addBeers = this.addBeers.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
    // debugger
  }

  attachEventListeners() {
  document.querySelector('.like-btn').addEventListener('click', this.handleLikes);

  };

  createBeers(beers) {
    beers.forEach(beer => {
      new Beer(beer);
    });
    this.addBeers();
  };

  addBeers() {
    document.querySelector('#beer-collection').innerHTML = '';
    Beer.all.forEach(
      beer => (document.querySelector('#beer-collection').innerHTML += beer.renderBeers())
    );
  };

  handleLikes(event) {
    const id = event.target.dataset.id
    const beer = this.beers.find(beer => beer.id == id)
    beer.likes++
  };

}
