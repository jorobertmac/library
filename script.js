const myLibrary = []
const cards = document.querySelector("#cards")

function Book(title, author, pages, description = "", read=false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.description = description
  this.read = read
  this.id = crypto.randomUUID()

  this.info = function() {
    let status = this.read ? "read" : "not read"
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`
  }
}

function addBookToLibrary(title, author, pages, description, read) {
  myLibrary.push(new Book(title, author, pages, description, read))
}

function displayBooks () {
  myLibrary.forEach(book => {
    makeCard(book)
  });
}

function makeCard(book) {
  const card = document.createElement("div")
  card.className = "card"
  card.dataset.bookId = book.id
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
  
}

myLibrary.push(new Book("Whispers of the Void", "Elara Kade", 342, "A thrilling sci-fi adventure following a rogue pilot uncovering a galaxy-wide conspiracy.", true))
myLibrary.push(new Book("The Crimson Veil", "Torin Vell", 487, "A gothic romance where a young scholar unravels the secrets of a haunted manor.", false))
myLibrary.push(new Book("Echoes Over Emberfall", "Sylas Wren", 256, "A fantasy tale of a cursed bard seeking redemption in a war-torn kingdom.", true))
myLibrary.push(new Book("Glass Horizons", "Mira Thalor", 613, "A dystopian novel about a hacker navigating a city of transparent walls and hidden truths.", false))
myLibrary.push(new Book("The Starwoven Tapestry", "Kael Draven", 391, "An epic saga of a weaver who binds the fates of gods and mortals.", true))
myLibrary.push(new Book("Shades of Iron", "Vera Quill", 178, "A gritty western where a lone gunslinger confronts her past in a lawless frontier.", true))
myLibrary.push(new Book("The Last Clockmaker", "Oren Feld", 524, "A steampunk mystery about a clockmaker racing to stop a time-altering catastrophe.", false))
myLibrary.push(new Book("Tides of Forgotten Songs", "Lirien Voss", 299, undefined, true))
myLibrary.push(new Book("The Obsidian Crown", "Drenar Holt", 465, "A dark fantasy where a exiled prince battles to reclaim a cursed throne.", false))
myLibrary.push(new Book("Silent Spires", "Auren Zeth", 320, "A post-apocalyptic tale of a scavenger exploring ancient towers for forgotten tech.", true))

displayBooks()