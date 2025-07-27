const myLibrary = {}
const cards = document.querySelector("#cards")

function Book(title, author, pages, description = "", read=false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.description = description
  this.read = read
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

function addBookToLibrary(title, author, pages, description, read) {
  const book = new Book(title, author, pages, description, read)
  myLibrary[book.id] = book
}

function displayBooks () {
for (const book in myLibrary) {
    makeCard(myLibrary[book])
  }
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
}

addBookToLibrary("Whispers of the Void", "Elara Kade", 342, "A thrilling sci-fi adventure following a rogue pilot uncovering a galaxy-wide conspiracy.", true)
addBookToLibrary("The Crimson Veil", "Torin Vell", 487, "A gothic romance where a young scholar unravels the secrets of a haunted manor.", true)
addBookToLibrary("Echoes Over Emberfall", "Sylas Wren", 256, "A fantasy tale of a cursed bard seeking redemption in a war-torn kingdom.", false)
addBookToLibrary("Glass Horizons", "Mira Thalor", 613, "A dystopian novel about a hacker navigating a city of transparent walls and hidden truths.", true)
addBookToLibrary("The Starwoven Tapestry", "Kael Draven", 391, "An epic saga of a weaver who binds the fates of gods and mortals.", true)
addBookToLibrary("Shades of Iron", "Vera Quill", 178, "A gritty western where a lone gunslinger confronts her past in a lawless frontier.", false)
addBookToLibrary("The Last Clockmaker", "Oren Feld", 524, "A steampunk mystery about a clockmaker racing to stop a time-altering catastrophe.", true)
addBookToLibrary("Tides of Forgotten Songs", "Lirien Voss", 299, "A lyrical journey of a mermaid bard rediscovering her lost heritage.", false)
addBookToLibrary("The Obsidian Crown", "Drenar Holt", 465, "A dark fantasy where a exiled prince battles to reclaim a cursed throne.", false)
addBookToLibrary("Silent Spires", "Auren Zeth", 320, "A post-apocalyptic tale of a scavenger exploring ancient towers for forgotten tech.", false)

displayBooks()

const readStatusButtons = document.querySelectorAll(".readStatus")

readStatusButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const id = button.parentElement.dataset.bookId
    const card = document.querySelector(`[data-book-id="${id}"]`)
    myLibrary[id].changeReadStatus()
    card.dataset.readStatus = myLibrary[id].read
    button.textContent = myLibrary[id].readInfo()
  })
})