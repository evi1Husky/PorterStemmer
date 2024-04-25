import { PorterStemmer } from "../src/PorterStemmer.js";
import { voc } from "./voc.js";
import { output } from "./output.js";

function test() {
  const wordsToTest = voc.split("\n").map(x => x.trim());
  const expected = output.split("\n").map(x => x.trim());

  const stemmer = new PorterStemmer();

  let passed = 0;

  for (let i = 0; i < wordsToTest.length - 1; i++) {
    const res = stemmer.stem(wordsToTest[i]);
    console.log("exp: " + expected[i], "in: " + wordsToTest[i], "=> out:", res);
    if (res !== expected[i]) {
      console.error("fail", wordsToTest[i], i);
      break;
    }
    passed++;
  }

  console.log("\npassed " + passed + "/" + (wordsToTest.length - 1));

  const t1 = performance.now();
  for (let i = 0; i < wordsToTest.length - 1; i++) {
    const res = stemmer.stem(wordsToTest[i]);
  }
  const t2 = performance.now();
  console.log("in: " + (t2 - t1).toFixed(3) + "ms");
}

test();

