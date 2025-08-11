const myLibrary = {}
const cards = document.querySelector("#cards")

function Book(title, author, pages, progress=0, description = "", artSource=undefined) {
  this.title = title
  this.author = author
  this.pages = pages
  this.progress = progress
  this.description = description
  this.artSource = artSource
  this.id = crypto.randomUUID()

  this.readInfo = function() {
    const percentRead = this.progress/this.pages
    if (percentRead === 1) {
      return "Read"
    } else if (percentRead === 0) {
      return "Unread"
    } else {
      return "Reading"
    }
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

function updateReadStatus(book) {
  const id = book.id
  const card = document.querySelector(`[data-book-id="${id}"]`)
  const pages = card.querySelector(".pages")
  pages.textContent = `${book.progress}/${book.pages} pg`
  pages.style.background = `linear-gradient(to right, rgba(124, 235, 124, 0.6) ${book.progress/book.pages*100}%, var(--text-background) ${book.progress/book.pages*100}%)`
}


// Find a way to get this under the addBookSubmit eventListener vvv
const imageFile = document.querySelector("#image")
let lastImage = ""
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
  if (book.progress.value === "") {
    book.progress.value = 0
  } else if (book.progress.value < 0) {
    alert(`Cannot accept ${book.progress.value}. Only positive numbers.`)
    return
  } else if (book.progress.value > book.pages.value) {
    alert(`Cannot accept ${book.progress.value} pages. ${book.title.value} only has ${book.pages.value} pages.`)
    return
  }
  
  const newBook = new Book(book.title.value, book.author.value, book.pages.value, book.progress.value, book.description.value, lastImage)
  addBookToLibrary(newBook)
  makeCard(newBook)
  
  
  book.reset()
})

function setReadStatusButton(book) {
  const id = book.id
  const card = document.querySelector(`[data-book-id="${id}"]`)
  const readStatusButton = card.querySelector(`.readStatus`)

  readStatusButton.addEventListener("click", (e) => {
    let pagesRead
    while (true) {
      pagesRead = prompt(`What page of ${book.title} are you on?`)
      if (pagesRead === null) {
        return
      } else if (pagesRead.trim() !== "" && !isNaN(pagesRead)) {
        pagesRead = Number(pagesRead)
        if (pagesRead > book.pages) {
          alert(`Cannot accept ${pagesRead} pages. ${book.title} only has ${book.pages} pages.`)
          return
        } else if (pagesRead < 0) {
          alert(`Cannot accept ${pagesRead}. Only positive numbers.`)
          return
        }
        break
      }
    }
    book.progress = pagesRead
    updateReadStatus(book)
    card.dataset.readStatus = book.readInfo()
    e.target.textContent = book.readInfo()
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
  card.dataset.readStatus = book.readInfo()
  cards.appendChild(card)
  
  const title = document.createElement("p")
  title.className = "title"
  title.textContent = book.title
  card.appendChild(title)

  const author = document.createElement("p")
  author.className = "author"
  author.textContent = book.author
  card.appendChild(author)
  
  const description = document.createElement("p")
  description.className = "description"
  description.textContent = book.description
  card.appendChild(description)
  
  const statusBar = document.createElement("div")
  statusBar.className = "statusBar"
  card.appendChild(statusBar)

  const pages = document.createElement("p")
  pages.className = "pages"
  pages.textContent = `${book.progress}/${book.pages} pg`
  pages.style.background = `linear-gradient(to right, rgba(124, 235, 124, 0.6) ${book.progress/book.pages*100}%, var(--text-background) ${book.progress/book.pages*100}%)`
  pages.style.textShadow = "0 0 3px blanchedalmond, 0 0 6px black, 0 0 10px blanchedalmond"
  statusBar.appendChild(pages)

  const readStatus = document.createElement("button")
  readStatus.className = "readStatus"
  readStatus.textContent = `${book.readInfo()}`
  statusBar.appendChild(readStatus)
  
  const removeBook = document.createElement("button")
  removeBook.className = "removeBook"
  removeBook.textContent = "Delete"
  card.appendChild(removeBook)

  card.style.backgroundImage = `url(${book.artSource})`

  setReadStatusButton(book)
  setRemoveBookButton(book)
}

addBookToLibrary(new Book("Whispers of the Void", "Elara Kade", 342, 342, "A thrilling sci-fi adventure following a rogue pilot uncovering a galaxy-wide conspiracy.", "./art/whispers_of_the_void_1.jpg"))
addBookToLibrary(new Book("The Crimson Veil", "Torin Vell", 487, 111, "A gothic romance where a young scholar unravels the secrets of a haunted manor.", "./art/crimson_veil_2.jpg"))
addBookToLibrary(new Book("Echoes Over Emberfall", "Sylas Wren", 256, 0, "A fantasy tale of a cursed bard seeking redemption in a war-torn kingdom.", "./art/echos_over_emberfall_1.jpg"))
addBookToLibrary(new Book("Glass Horizons", "Mira Thalor", 613, 111, "A dystopian novel about a hacker navigating a city of transparent walls and hidden truths.", "./art/glass_horizons_1.jpg"))
addBookToLibrary(new Book("The Starwoven Tapestry", "Kael Draven", 391, 111, "An epic saga of a weaver who binds the fates of gods and mortals.", "./art/starwoven_tapestry_1.jpg"))
addBookToLibrary(new Book("Shades of Iron", "Vera Quill", 178, 0, "A gritty western where a lone gunslinger confronts her past in a lawless frontier.", "./art/shade_of_iron_2.jpg"))
addBookToLibrary(new Book("The Last Clockmaker", "Oren Feld", 524, 111, "A steampunk mystery about a clockmaker racing to stop a time-altering catastrophe.", "./art/last_clockmaker_1.jpg"))
addBookToLibrary(new Book("Tides of Forgotten Songs", "Lirien Voss", 299, 0, "A lyrical journey of a mermaid bard rediscovering her lost heritage.", "./art/tides_of_forgotten_songs_1.jpg"))
addBookToLibrary(new Book("The Obsidian Crown", "Drenar Holt", 465, 0, "A dark fantasy where a exiled prince battles to reclaim a cursed throne.", "./art/obsidian_crown_2.jpg"))
addBookToLibrary(new Book("Silent Spires", "Auren Zeth", 320, 0, "A post-apocalyptic tale of a scavenger exploring ancient towers for forgotten tech.", "./art/silent_spires_2.jpg"))

displayBooks()
