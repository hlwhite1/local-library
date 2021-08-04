function findAuthorById(authors, id) {
  return found = authors.find((authorsId) => authorsId.id === id);
}


function findBookById(books, id) {
  return found = books.find((booksId) => booksId.id === id);
}

function partitionBooksByBorrowedStatus(books) {
 
    //create 2 arrays, borrowed and unborrowed
    //use filter to create the borrowed array (borrows[0]===false)
    const borrowedArr = books.filter((book) => book.borrows[0].returned === false);
    //console.log(borrowedArr)
    //use filter to create the unborrowed array
    const unborrowedArr = books.filter((book) => book.borrows[0].returned === true);
    //return an array with both borrowed and unborrowed inside it
    let allBorrowed = [] //declare an empty array to ass the created arrays to
    //push created arrays to empty array
    allBorrowed.push(borrowedArr);
    allBorrowed.push(unborrowedArr);
    //return array with both created arrays
    return allBorrowed;
}

function getBorrowersForBook(book, accounts) {

    let result = [];
    let {borrows} = book;
    borrows.forEach(borrow=> {
      let account = accounts.find(acc => acc.id === borrow.id);
      account['returned'] = borrow.returned;
      result.push(account);
      });
    return result.slice(0, 10);
  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
