class TrieNode {
  constructor(character, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = {};
  }

  addChild(character, isCompleteWord = false) {
    if (!this.children[character]) {
      this.children[character] = new TrieNode(character, isCompleteWord);
    }

    const childNode = this.children[character];

    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

    return childNode;
  }

  getWordCount(chars, count) {
    if (chars.length === 0) {
      return count + (this.isCompleteWord ? 1 : 0);;
    }

    const word = chars[0];
    if (word === '?') {
      if (chars.length === 1) {
        let sum = 0;
        for (let i in this.children) {
          sum += this.children[i].isCompleteWord ? 1 : 0
        }

        return count + sum
      }

      let sum = 0;
      for (let i in this.children) {
        sum += this.children[i].getWordCount(chars.slice(1), count);
      }

      return sum + count;
    } else {
      if (!this.children[word]) {
        return count;
      }
    }

    return this.children[word].getWordCount(chars.slice(1), count);
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode('*')
  }

  addWord(word) {
    let currentNode = this.head;
    for (let i = 0; i < word.length;i++) {
      currentNode = currentNode.addChild(word[i], i === word.length-1)
    }  
  }

  wordCount(word) {
    const chars = Array.from(word);
    return this.head.getWordCount(chars, 0);
  }
}

const createTrie = (words) => {
  const root = new Trie();
  words.forEach(word => {
    root.addWord(word);
  });
  return root;
}

const search = (words, queries) => {
  const root = createTrie(words);

  return queries.map(i => root.wordCount(i))
}

test('search', () => {
  expect(search(
    ["frodo", "front", "frost", "frozen", "frame", "kakao"],
    ["fro??", "????o", "fr???", "fro???", "pro?"],
  ))
    .toEqual([3, 2, 4, 1, 0]);
});

test('wordCount', () => {
  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('fro??')
  ).toBe(3);

  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('????o')
  ).toBe(2);

  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('????t')
  ).toBe(2);

  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('fr???')
  ).toBe(4);

  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('fro???')
  ).toBe(1);

  expect(
    createTrie(["frodo", "front", "frost", "frozen", "frame", "kakao"])
      .wordCount('pro?')
  ).toBe(0);
});