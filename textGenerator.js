/**
 * Generates a string of ASCII blocks of a specified length.
 * @param {number} length - The number of ASCII blocks to generate.
 * @returns {string} - A string containing the generated ASCII blocks.
 */
function generateFromASCIIBlocks(length) {
  const asciiBlocks = [
    "█",
    "▌",
    "▐",
    "▀",
    "▄",
    "▁",
    "▂",
    "▃",
    "▅",
    "▆",
    "▇",
    "▉",
    "▊",
    "▍",
    "▎",
    "▏",
    "▐",
    "▌",
    "▍",
    "▎",
    "▏",
  ]

  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * asciiBlocks.length)
    result += asciiBlocks[randomIndex]
  }

  return result
}

function generatePseudoWord(length) {
  let word = ""

  for (let i = 0; i < length; i++) {
    const randomChar = String.fromCharCode(
      Math.floor(Math.random() * (126 - 32 + 1)) + 32,
    )
    word += randomChar
  }

  return word
}

function generatePseudoText(wordsCount, minWordLength = 1, maxWordLength = 10) {
  const words = []

  for (let i = 0; i < wordsCount; i++) {
    const wordLength =
      Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) +
      minWordLength
    const word = generatePseudoWord(wordLength)
    words.push(word)
  }
  
  return words.join(" ")
}
