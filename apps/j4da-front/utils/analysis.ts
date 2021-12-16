const sortExtractedKeywords = (unsorted_object: { [key: string]: number }) => {
  return Object.entries(unsorted_object)
    .sort((a, b) => a[1] - b[1])
    .reverse()
}

export const extractKeywords = (text: string) => {
  const counts: { [key: string]: number } = {}
  text
    .replace(/\W/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((key) => key.length > 0)
    .map((key) => {
      counts[key] = (counts[key] || 0) + 1
    })
  return sortExtractedKeywords(counts)
}
