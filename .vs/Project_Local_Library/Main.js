function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}