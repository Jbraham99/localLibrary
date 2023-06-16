function findAccountById(accounts, userId) {
  return accounts.find(element=>element.id === userId)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB)=> accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((accumulator, {borrows})=> {
    return accumulator + borrows.reduce((accumulator, borrow)=>borrow.id === account.id ? ++accumulator : accumulator,0);
  },0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //return books posessed array
  let booksCheckedOut = [];
  for(let book of books) {
    const borrows = book.borrows
      if (!borrows[0].returned && borrows[0].id === account.id) {
        const authorObj = authors.find((author)=> author.id === book.authorId)
        book.author = authorObj
        booksCheckedOut.push(book)
      }
    }
    return booksCheckedOut
}
// function getBooksPossessedByAccount(account, books, authors) {
//   // des variable from account
//   const {id} = account;

//   const arr = []; // create base array variable

//   // iterate over books object
//   for(let book of books) {

//     // create temp variable
//     let borrow = book.borrows;

//     // if-cond check
//     if(!borrow[0].returned && borrow[0].id === id){

//       // including author information and storing it in a variable
//       let found = authors.find(author => author.id === book.authorId);
//       book.author = found;
//       arr.push(book); // It returns an array of book objects
//     }
//   }
//   // console.log(arr);

//   // It returns an array of book objects
//   return arr;
// }.
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
