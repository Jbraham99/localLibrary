function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let partitionedBooks = [];
  let borrowed = [];
  let available = [];
  const separate = books.forEach((book)=> book.borrows[0].returned ? available.push(book) : borrowed.push(book))
  // for (let book of books) {
  //   if (book.borrows[0].returned) {
  //     available.push(book)
  //   }
  //   else {
  //     borrowed.push(book)
  //   }
  // }
  partitionedBooks.push(borrowed)
  partitionedBooks.push(available)
  return partitionedBooks
}

function getBorrowersForBook(book, accounts) {
  let bookUsers = [];//create an empty array
  const borrows = book.borrows;//this is the list of accounts that borrowed the book by id.
  for (let account of accounts) {//loop through accounts
    for (let borrow of borrows) {//loop through borrows
      if (borrow.id === account.id) {//Check IF account id matches borrowid && IF bookUsers array is less 10 users
        account.returned = borrow.returned//if true add returned key to account and make it equal returned key and value from borrows
        bookUsers.push(account);//add the account to the bookUser list
      }
    }
  }
  return bookUsers.slice(0,10)//return list
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
