const myLibrary = []
const cards = document.querySelector("#cards")

function Book(title, author, pages, read=false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.id = crypto.randomUUID()

  this.info = function() {
    let status = this.read ? "read" : "not read"
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

function displayBooks () {
  myLibrary.forEach(book => {
    makeCard(book)
  });
}

function makeCard(book) {
  const card = document.createElement("div")
  card.className = "card"
  card.innerHTML = `${book.info()} ${book.id}`
  cards.appendChild(card)
}

myLibrary.push(new Book("One","Alpha",12,true))
myLibrary.push(new Book("Two Two","Bravo Charlie",12,false))
myLibrary.push(new Book("j","c",12,true))
displayBooks()