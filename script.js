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

myLibrary.push(new Book("One","Alpha",12,true))
myLibrary.push(new Book("Two Two","Bravo Charlie",12,false))
myLibrary.push(new Book("j","c",12,true))
displayBooks()