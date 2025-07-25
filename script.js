function Book(title, author, pages, read=false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read

  this.info = function() {
    let status = this.read ? "read" : "not yet read"
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`
  }
}