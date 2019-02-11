const beerEl = document.querySelector('#beer-collection')
const formEl = document.querySelector('#new-beer-form')
const nameInput = document.querySelector('#nameInput')
const breweryInput = document.querySelector('#breweryInput')
const regionInput = document.querySelector('#regionInput')
const styleInput = document.querySelector('#styleInput')
const imageInput = document.querySelector('#imgInput')
const reviewInput = document.querySelector('#reviewInput')

const state = {
  beers: [],
  edit: null
}

const getBeers = () => {
  return fetch(`http://localhost:3000/beers`)
    .then(res => res.json())
    .then(beers => {
      state.beers = beers
      console.log('data in state!') 
      renderAllBeers()
  })
}

const renderAllBeers = () => {
  beerEl.innerHTML = ""
  state.beers.forEach(beer => beerInfo(beer))

  const likeBtns = document.querySelectorAll('.like-btn')
  likeBtns.forEach(likeBtn => likeBtn.addEventListener('click', likeHandler))

  const editBtns = document.querySelectorAll('.edit-btn')
  editBtns.forEach(editBtn => editBtn.addEventListener('click', editHandler))

  const deleteBtns = document.querySelectorAll('.delete-btn')
  deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteHandler))

  const cancelBtn = document.querySelectorAll('#cancel')
  deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', cancelHandler))
}

const beerInfo = (beer) => {
  beerEl.innerHTML += `
    <div class="card">
      <h2>${beer.name}</h2>
      <img src=${beer.image} class="beer-avatar" />
      <p><b>Brewery:</b> ${beer.brewery}</P>
      <p><b>Region:</b> ${beer.region}</P>
      <p><b>Style:</b> ${beer.style}</P>
      <p><b>Review:</b> ${beer.review}</p>
      <p><b>Likes:</b> ${beer.likes}</p>
      <div class="btn_wrapper">
      <button data-id="${beer.id}" class="like-btn">Like beer</button>
      <button data-id="${beer.id}" class="edit-btn">Edit beer</button>
      <button data-id="${beer.id}" class="delete-btn">Delete beer</button>
      </div>
    </div>`
}

const cancelHandler = (event) => {
  const id = event.target.dataset.id
  renderAllBeers()
}

const likeHandler = (event) => {
  const id = event.target.dataset.id
  const beer = state.beers.find(beer => beer.id == id)
  beer.likes++
  likeBeer(beer)
}

const editHandler = (event) => {
  const id = event.target.dataset.id
  state.edit = id
  const beer = state.beers.find(beer => beer.id == id)
  nameInput.value = beer.name
  breweryInput.value = beer.brewery
  regionInput.value = beer.region
  reviewInput.value = beer.review
  styleInput.value = beer.style
  imageInput.value = beer.image
}

const deleteHandler = (event) => {
  const id = event.target.dataset.id
  deleteBeer(id)
}

formEl.addEventListener('submit', (event) => {
	event.preventDefault()
	const name = nameInput.value
  const brewery = breweryInput.value
  const region = regionInput.value
  const style = styleInput.value
  const image = imageInput.value
  const review = reviewInput.value
  const likes = 0
  const formData = { name, brewery, region, style, image, review, likes }

  if (state.edit) {
    editBeer(formData)

  } else {
    createNewBeer(formData)
  }
	formEl.reset()
  state.edit = null
})
//api stuff
const likeBeer = (beer) => {
  return fetch(`http://localhost:3000/beers/${beer.id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(beer)
  }).then(res => getBeers())
}

const createNewBeer = (formData) => {
  return fetch(`http://localhost:3000/beers/`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  }).then(res => getBeers())
}

const editBeer = (formData) => {
  return fetch(`http://localhost:3000/beers/${state.edit}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  }).then(res => getBeers())
}

const deleteBeer = (id) => {
  return fetch(`http://localhost:3000/beers/${id}`,{
    method: 'DELETE',
  }).then(res => getBeers())
}

getBeers()
