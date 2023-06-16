
function getTotalBooksCount(books) {
  return books.length//return the length of the books array
}

function getTotalAccountsCount(accounts) {
  return accounts.length//return the length of the accounts array
}

function getBooksBorrowedCount(books) {
  const result = books.reduce((accumulator, {borrows})=> !borrows[0].returned ? ++accumulator : accumulator,0)
  return result
}

function helpSort(obj) {
  // console.log("-obj-", obj)
  const keys = Object.keys(obj);//array
  // console.log("-keys-", keys)
  return keys.sort((a, b)=>{
    if (obj[a] > obj[b]) {//large to small
      return -1
    }
    else if (obj[a] < obj[b]) {//small to large
      return 1
    }
    else {//stays the same
      return 0
    }
  })
}


function getMostCommonGenres(books) {
  const finalList = [];//create an empty array
  const genresObject = books.reduce((accumulator, {genre})=>{
    if (accumulator[genre]) {
      accumulator[genre] += 1
    }
    else {
      accumulator[genre] = 1
    }
    return accumulator
  }, {});
  // console.log(genresObject)
  const sorted = helpSort(genresObject)
  // console.log("----------",typeof sorted)
  //loop through

  return sorted.map((name)=>({
    name, count: genresObject[name]
  })).slice(0,5)//creates an array

  // return sorted
}

function getMostPopularBooks(books) {
  const bookObj = books.reduce((accumulator, {title, borrows})=>{//loop or use an array method to go through the books array
    if (accumulator[title]){//If the book title is in the accumulator obj. create it as a key and add borrows.length as it's value
      accumulator[title] += borrows.length  //Count = the amount of borrows in the book's borrows array

    }
    else {//else, just create that book title as a key and borrows.length as it's value
      accumulator[title] = borrows.length  //Count = the amount of borrows in the book's borrows array

    }
    return accumulator
  }, {})
  // console.log(bookObj)
  const sorted = helpSort(bookObj)//Sort each book by the amount of borrows
  // console.log("sorted object!", sorted)//this is an array of sorted objects
  return sorted.map((name)=>({//Will RETURN a new array than the array passed in
    name, count: bookObj[name]//insert that object into an array with new keys and values
  })).slice(0, 5)//Make copy of original array to only have 5 objects in the copy
}

//Helper function that takes an array of authors and the amount of 
function helpSortAuthor(objects) {
  const result = objects.sort((a, b)=>{
    console.log("----typeof",typeof a.count)
   return b.count - a.count
  })
  return result
}

function getMostPopularAuthors(books, authors) {
    result = []
    for (let author of authors){
      const filterBooksByAuthor = books.filter((book)=>{
        if (author.id === book.authorId) {
          const authorObj = {};
          authorObj.name = (`${author.name.first} ${author.name.last}`);
          authorObj.count = book.borrows.length;
          console.log("!!!!", authorObj)
          result.push(authorObj)
        }
      })
    }
    console.log(result)
    const sortedResult = helpSortAuthor(result)
    console.log("----sortedResult", sortedResult)
  return sortedResult.slice(0, 5);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
