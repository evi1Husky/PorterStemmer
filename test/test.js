import { PorterStemmer } from "../src/PorterStemmer.js";
import { voc } from "./voc.js";
import { output } from "./output.js";

const test = () => {
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

  console.log("\npassed " + passed + "/" + (wordsToTest.length - 1) + "\n");
  
  console.log("measuring performance..." + "\n");

  const shuffle = (array) => {
    const rnd = (n) => Math.floor(Math.random() * (n + 1))
    for (let i = array.length - 1; i > 0; i--) { 
      const j = rnd(i);
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    array.push(array[rnd(array.length - 1)] + "_");
    return array; 
  };

  const dAvg = [];
  const performanceTest = () => {
    wordsToTest = shuffle(wordsToTest);
    const t1 = performance.now();
    for (let i = 0; i < wordsToTest.length - 1; i++) {
      const res = PorterStemmer(wordsToTest[i]);
    }
    const t2 = performance.now();
    dAvg.push(t2 - t1);
  }

  const test = () => {
    for (let i = 0; i < 500; i++) {
      performanceTest();
    }
    const avgTime = dAvg.reduce((a, b) => a + b, 0) / dAvg.length;
    console.log("avg time: " + avgTime.toFixed(3) + "ms for 23532 words\n");
  }

  test();
}

test();

