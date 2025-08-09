const myLibrary = {}
const cards = document.querySelector("#cards")

function Book(title, author, pages, progress=0, description = "", read=false, artSource=undefined) {
  this.title = title
  this.author = author
  this.pages = pages
  this.progress = progress
  this.description = description
  this.read = read
  this.artSource = artSource
  this.id = crypto.randomUUID()

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo()}`
  }

  this.readInfo = function() {
    return this.read ? "Read" : "Unread"
  }

  this.changeReadStatus = function() {
    this.read = !this.read
  }
}

function addBookToLibrary(book) {
  myLibrary[book.id] = book
}

function displayBooks () {
  cards.replaceChildren()
  for (const book in myLibrary) {
    makeCard(myLibrary[book])
  }
}


// Find a way to get this under the addBookSubmit eventListener vvv
const imageFile = document.querySelector("#image")
let lastImage
imageFile.addEventListener("change", (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      lastImage = e.target.result
    }
    lastImage = reader.readAsDataURL(file)
  }
})


const addBookSubmit = document.querySelector("#addBookForm")
addBookSubmit.addEventListener("submit", (e) => {
  e.preventDefault()
  const book = e.target
  const newBook = new Book(book.title.value, book.author.value, book.pages.value, book.progress.value, book.description.value, false, lastImage)
  addBookToLibrary(newBook)
  makeCard(newBook)
  
  
  book.reset()
})

function setReadStatusButton(book) {
  const id = book.id
  const card = document.querySelector(`[data-book-id="${id}"]`)
  const readStatusButton = card.querySelector(`.readStatus`)

  readStatusButton.addEventListener("click", (e) => {
    myLibrary[id].changeReadStatus()
    card.dataset.readStatus = myLibrary[id].read
    e.target.textContent = myLibrary[id].readInfo()
  })
}

function setRemoveBookButton(book) {
  const id = book.id
  const card = document.querySelector(`[data-book-id="${id}"]`)
  const removeBookButton = card.querySelector(`.removeBook`)

  removeBookButton.addEventListener("click", (e) => {
    if (confirm(`Delete ${book.title} from your library?`)) {
      delete myLibrary[id]
      card.parentNode.removeChild(card)
    }
  })
}

function makeCard(book) {
  const card = document.createElement("div")
  card.className = "card"
  card.dataset.bookId = book.id
  card.dataset.readStatus = book.read
  cards.appendChild(card)
  
  const title = document.createElement("p")
  title.className = "title"
  title.textContent = book.title
  card.appendChild(title)

  const author = document.createElement("p")
  author.className = "author"
  author.textContent = book.author
  card.appendChild(author)

  const pages = document.createElement("p")
  pages.className = "pages"
  pages.textContent = `${book.progress} / ${book.pages} pages`
  card.appendChild(pages)
  
  const description = document.createElement("p")
  description.className = "description"
  description.textContent = book.description
  card.appendChild(description)

  const buttonBar = document.createElement("div")
  buttonBar.className = "buttonBar"
  card.appendChild(buttonBar)
  
  const removeBook = document.createElement("button")
  removeBook.className = "removeBook"
  removeBook.textContent = "Delete"
  buttonBar.appendChild(removeBook)
  
  const readStatus = document.createElement("button")
  readStatus.className = "readStatus"
  readStatus.textContent = `${book.readInfo()}`
  buttonBar.appendChild(readStatus)

  card.style.backgroundImage = `url(${book.artSource})`

  setReadStatusButton(book)
  setRemoveBookButton(book)
}

addBookToLibrary(new Book("Whispers of the Void", "Elara Kade", 342, 111, "A thrilling sci-fi adventure following a rogue pilot uncovering a galaxy-wide conspiracy.", true, "./art/whispers_of_the_void_1.jpg"))
addBookToLibrary(new Book("The Crimson Veil", "Torin Vell", 487, 111, "A gothic romance where a young scholar unravels the secrets of a haunted manor.", true, "./art/crimson_veil_2.jpg"))
addBookToLibrary(new Book("Echoes Over Emberfall", "Sylas Wren", 256, 0, "A fantasy tale of a cursed bard seeking redemption in a war-torn kingdom.", false, "./art/echos_over_emberfall_1.jpg"))
addBookToLibrary(new Book("Glass Horizons", "Mira Thalor", 613, 111, "A dystopian novel about a hacker navigating a city of transparent walls and hidden truths.", true, "./art/glass_horizons_1.jpg"))
addBookToLibrary(new Book("The Starwoven Tapestry", "Kael Draven", 391, 111, "An epic saga of a weaver who binds the fates of gods and mortals.", true, "./art/starwoven_tapestry_1.jpg"))
addBookToLibrary(new Book("Shades of Iron", "Vera Quill", 178, 0, "A gritty western where a lone gunslinger confronts her past in a lawless frontier.", false, "./art/shade_of_iron_2.jpg"))
addBookToLibrary(new Book("The Last Clockmaker", "Oren Feld", 524, 111, "A steampunk mystery about a clockmaker racing to stop a time-altering catastrophe.", true, "./art/last_clockmaker_1.jpg"))
addBookToLibrary(new Book("Tides of Forgotten Songs", "Lirien Voss", 299, 0, "A lyrical journey of a mermaid bard rediscovering her lost heritage.", false, "./art/tides_of_forgotten_songs_1.jpg"))
addBookToLibrary(new Book("The Obsidian Crown", "Drenar Holt", 465, 0, "A dark fantasy where a exiled prince battles to reclaim a cursed throne.", false, "./art/obsidian_crown_2.jpg"))
addBookToLibrary(new Book("Silent Spires", "Auren Zeth", 320, 0, "A post-apocalyptic tale of a scavenger exploring ancient towers for forgotten tech.", false, "./art/silent_spires_2.jpg"))

displayBooks()
