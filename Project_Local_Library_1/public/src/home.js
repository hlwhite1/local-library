function getTotalBooksCount(books) {
 return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) { 
  return books.reduce((acc, book) => {
  const booksBorrowed = book.borrows[0].returned;
  if (booksBorrowed === false) {
    acc++;
  }
  return acc;
}, 0);
}

function _limitToFive (array) {
  return array.slice(0, 5);
}


function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA]>obj[keyB]) {
      return -1;
    } else if(obj[keyB]>obj[keyA]) {
      return 1;
    }
  })
}

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre]+=1;
    } else{
      acc[genre]=1;
    }
    return acc;
  }, {})
  let sortedKeys = _sortObjectByValues(countObj);
  let sorted = sortedKeys.map((key) => ({name: key, count: countObj[key]}));
  return _limitToFive(sorted);
}

function getMostPopularBooks(books) {
    const popularBooks =
      books.map((book) => 
    {return { name: book.title, count: book.borrows.length };})
    .sort(function (a, b) {
          return b.count - a.count;
        });
        return popularBooks.slice(0,5);
  
}




function getMostPopularAuthors(books, authors) {
  // we are going to use reduce to get an array of objects that have the correct keys and values
  const authorList = books.reduce((acc, book) => { 
    // grab the authorId and borrows array
    const { authorId, borrows } = book;
    // get the authorObj
    const authorObj = authors.find(author => author.id === authorId);
    // build the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    // get the number of times this book has been borrowed
    const count = borrows.length;
    // see if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      // if we get in here, then we already have an entry for this author in the accumulator
      // so we need to just add to its borrow count
      authExists.count += count;
    } else {
      // if we get in here, then we don't have an entry for this author, so we need to add it
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    // finally, return the acc
    return acc;
  }, []);
  // sort in descending order by count
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  // get the top five
  const topFive = _limitToFive(sortedAuthorList);
  // and return the top five
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
