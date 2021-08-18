function sortTrees(array) {
  const sorted = array.sort((a, b) => a.common.localeCompare(b.common));
  return sorted;
}

module.exports = {
  sortTrees,
};
