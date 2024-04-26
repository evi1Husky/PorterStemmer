import { PorterStemmer } from "../src/PorterStemmer.js";
import { voc } from "./voc.js";
import { output } from "./output.js";

const main = () => {
  let wordsToTest = voc.split("\n").map(x => x.trim());
  let expected = output.split("\n").map(x => x.trim());

  let passed = 0;

  for (let i = 0; i < wordsToTest.length - 1; i++) {
    const res = PorterStemmer(wordsToTest[i]);
    console.log("exp: " + expected[i], "in: " + wordsToTest[i], "=> out:", res);
    if (res !== expected[i]) {
      console.error("fail", wordsToTest[i], i);
      break;
    }
    passed++;
  }

  console.log("\npassed " + passed + "/" + (wordsToTest.length - 1));

  const perormanceTest = () => {
    wordsToTest = wordsToTest.map(x => x).sort((a, b) => a - b);
    wordsToTest.push("");
    const t1 = performance.now();
    for (let i = 0; i < wordsToTest.length - 1; i++) {
      const res = PorterStemmer(wordsToTest[i]);
    }
    const t2 = performance.now();
    console.log((t2 - t1).toFixed(2) + "ms");
  }

  for (let i = 0; i < 20; i++) {
    perormanceTest();
  }
}

main();

