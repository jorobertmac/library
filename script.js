const myLibrary = {}
const cards = document.querySelector("#cards")

function Book(title, author, pages, description = "", read=false, artSource=undefined) {
  this.title = title
  this.author = author
  this.pages = pages
  this.description = description
  this.read = read
  this.artSource = artSource
  this.id = crypto.randomUUID()

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo()}`
  }

  this.readInfo = function() {
    return this.read ? "Read" : "Not Read"
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
    delete myLibrary[id]
    card.parentNode.removeChild(card)
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
  pages.textContent = book.pages
  card.appendChild(pages)
  
  const description = document.createElement("p")
  description.className = "description"
  description.textContent = book.description
  card.appendChild(description)

  const readStatus = document.createElement("button")
  readStatus.className = "readStatus"
  readStatus.textContent = `${book.readInfo()}`
  card.appendChild(readStatus)

  const removeBook = document.createElement("button")
  removeBook.className = "removeBook"
  removeBook.textContent = "Delete"
  card.appendChild(removeBook)

  card.style.backgroundImage = `url(${book.artSource})`

  setReadStatusButton(book)
  setRemoveBookButton(book)
}

addBookToLibrary(new Book("Whispers of the Void", "Elara Kade", 342, "A thrilling sci-fi adventure following a rogue pilot uncovering a galaxy-wide conspiracy.", true, "./art/whispers_of_the_void_1.jpg"))
addBookToLibrary(new Book("The Crimson Veil", "Torin Vell", 487, "A gothic romance where a young scholar unravels the secrets of a haunted manor.", true, "./art/crimson_veil_2.jpg"))
addBookToLibrary(new Book("Echoes Over Emberfall", "Sylas Wren", 256, "A fantasy tale of a cursed bard seeking redemption in a war-torn kingdom.", false, "./art/echos_over_emberfall_1.jpg"))
addBookToLibrary(new Book("Glass Horizons", "Mira Thalor", 613, "A dystopian novel about a hacker navigating a city of transparent walls and hidden truths.", true, "./art/glass_horizons_1.jpg"))
addBookToLibrary(new Book("The Starwoven Tapestry", "Kael Draven", 391, "An epic saga of a weaver who binds the fates of gods and mortals.", true, "./art/starwoven_tapestry_1.jpg"))
addBookToLibrary(new Book("Shades of Iron", "Vera Quill", 178, "A gritty western where a lone gunslinger confronts her past in a lawless frontier.", false, "./art/shade_of_iron_2.jpg"))
addBookToLibrary(new Book("The Last Clockmaker", "Oren Feld", 524, "A steampunk mystery about a clockmaker racing to stop a time-altering catastrophe.", true, "./art/last_clockmaker_1.jpg"))
addBookToLibrary(new Book("Tides of Forgotten Songs", "Lirien Voss", 299, "A lyrical journey of a mermaid bard rediscovering her lost heritage.", false, "./art/tides_of_forgotten_songs_1.jpg"))
addBookToLibrary(new Book("The Obsidian Crown", "Drenar Holt", 465, "A dark fantasy where a exiled prince battles to reclaim a cursed throne.", false, "./art/obsidian_crown_2.jpg"))
addBookToLibrary(new Book("Silent Spires", "Auren Zeth", 320, "A post-apocalyptic tale of a scavenger exploring ancient towers for forgotten tech.", false, "./art/silent_spires_2.jpg"))

displayBooks()
