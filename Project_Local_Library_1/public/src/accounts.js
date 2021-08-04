function findAccountById(accounts, id) {
    return found = accounts.find((accountsTotal) => accountsTotal.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, {borrows}) => {
    if (borrows.some((borrow) => borrow.id === account.id)) {
      acc++;
      return acc;
    }
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //create an array of books currently checked out by given account
  let checkedOutBooks = books.filter(({borrows}) => {
    return borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)
    
  });
  
  let newArr = checkedOutBooks.map(book => {
    let author = authors.find(author => book.authorId === author.id)
    
    return {author, ...book}
  })
  console.log(newArr);
  return newArr;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
