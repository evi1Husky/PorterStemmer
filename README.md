# Porter Stemmer

Martin Porter stemmer algorithm written in JavaScript.
Reference: https://tartarus.org/martin/PorterStemmer/

## Features

- Follows original procedural implementation with char buffer and index pointers for the best performance.
- Processes the 23k words test suit in 11ms on mobile i5 in node js.
- It's just one big function that takes string and returns string, no side effects, classes or module scoped regexes.
- Both ESM and CJS exports.

## How to use

```sh
npm i porter-stemmer-js
```

```javascript
import { PorterStemmer } from "porter-stemmer-js"

// the word to stem must be lower case with no trailing spaces or symbols

const stemmedWord = PorterStemmer("running");

console.log(stemmedWord) // "run"
```
# License

This project is licensed under the MIT License.

