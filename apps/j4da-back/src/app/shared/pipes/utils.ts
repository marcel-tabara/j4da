export const sortByTitle = (a, b) => {
  if (a.title > b.title) {
    return 1
  } else if (a.title < b.title) {
    return -1
  } else {
    return 0
  }
}
