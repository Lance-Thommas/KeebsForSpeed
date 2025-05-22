export const fetchWords = async () => {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=200");
    const words = await response.json();
    return words;
};

export const getLines = (words, wordsPerLine = 10) => {
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
};
