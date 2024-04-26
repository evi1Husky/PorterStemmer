/**
 * @description Reduces a word to its base form using the Porter Stemmer algorithm.
 * @param {string} word - The word to be stemmed. Should be in lowercase, without symbols, 
 * and without trailing spaces.
 * @returns {string} The stemmed word.
 */
const PorterStemmer = (word) => {
  const i = word.length;
  const b = new Array(i);
  let k = i - 1;
  let j = 0;

  if (i <= 2) 
    return word;

  for (let j = 0; j < i; j++) 
    b[j] = word[j];

  const cons = (i) =>
    {  switch (b[i]) 
       {  case "a": case "e": case "i": case "o": case "u": return false;
          case "y": return i === 0 ? true : !cons(i - 1);
          default: return true;
       }
    }

  const m = () => 
    {  let n = 0;
       let i = 0;
       while (true) 
       {  if (i > j) return n;
          if (!cons(i)) break; 
          i++;
       }
       i++;
       while (true) 
       {  while (true) 
          {  if (i > j) return n;
             if (cons(i)) break;
             i++;
          }
        i++;
        n++;
        while (true) 
        {  if (i > j) return n;
           if (!cons(i)) break;
           i++;
        }
        i++;
      }
    }

  const vowelinstem = () =>
    {  let i = 0;
       for (i = 0; i <= j; i++) if (!cons(i)) return true;
       return false;
    }

  const doublec = (j) =>
    {  if (j < 1) return false;
       if (b[j] !== b[j - 1]) return false;
       return cons(j);
    }

  const cvc = (i) =>
    {  if (i < 2 || !cons(i) || cons(i - 1) || !cons(i - 2)) 
         return false;
       let ch = b[i];
       if (ch === "w" || ch === "x" || ch === "y") return false;
       return true;
    }

  const ends = (s) =>
    {  const l = s.length;
       const o = k - l + 1;
       if (o < 0) return false;
       for (let i = 0; i < l; i++) 
         if (b[o + i] !== s[i]) 
           return false;
       j = k - l;
       return true;
    }

  const setto = (s) =>
    {  const l = s.length;
       const o = j + 1;
       for (let i = 0; i < l; i++) 
         b[o + i] = s[i];
       k = j + l;
    }

  const r = (s) =>
    {  if (m() > 0) 
         setto(s); 
    }

  const step1 = () =>
    {  if (b[k] === "s")
       {  if (ends("sses")) k -= 2; else
          if (ends("ies")) setto("i"); else
          if (b[k - 1] !== "s") k--;
       }
       if (ends("eed")) { if (m() > 0) k--; } else
       if ((ends("ed") || ends("ing")) && vowelinstem()) 
       {  k = j;
          if (ends("at")) setto("ate"); else 
          if (ends("bl")) setto("ble"); else
          if (ends("iz")) setto("ize"); else
          if (doublec(k))
          {  k--;
             let ch = b[k];
             if (ch === "l" || ch === "s" || ch === "z") k++;
          }
          else if (m() === 1 && cvc(k)) setto("e");
        }
    }

  const step2 = () =>
    {  if (ends("y") && vowelinstem())
         b[k] = "i";
    }

  const step3 = () =>
    {  if (k === 0) return; 
       switch (b[k - 1]) 
       {  case "a": if (ends("ational")) { r("ate"); break; }
                    if (ends("tional")) { r("tion"); break; }
                    break;
          case "c": if (ends("enci")) { r("ence"); break; }
                    if (ends("anci")) { r("ance"); break; }
                    break;
          case "e": if (ends("izer")) { r("ize"); break; }
                    break;
          case "l": if (ends("bli")) { r("ble"); break; }
                    if (ends("alli")) { r("al"); break; }
                    if (ends("entli")) { r("ent"); break; }
                    if (ends("eli")) { r("e"); break; }
                    if (ends("ousli")) { r("ous"); break; }
                    break;
          case "o": if (ends("ization")) { r("ize"); break; }
                    if (ends("ation")) { r("ate"); break; }
                    if (ends("ator")) { r("ate"); break; }
                    break;
          case "s": if (ends("alism")) { r("al"); break; }
                    if (ends("iveness")) { r("ive"); break; }
                    if (ends("fulness")) { r("ful"); break; }
                    if (ends("ousness")) { r("ous"); break; }
                    break;
          case "t": if (ends("aliti")) { r("al"); break; }
                    if (ends("iviti")) { r("ive"); break; }
                    if (ends("biliti")) { r("ble"); break; }
                    break;
          case "g": if (ends("logi")) { r("log"); break; }
    }  }

  const step4 = () =>
    {  switch (b[k]) 
       {  case "e": if (ends("icate")) { r("ic"); break; }
                    if (ends("ative")) { r(""); break; }
                    if (ends("alize")) { r("al"); break; }
                    break;
          case "i": if (ends("iciti")) { r("ic"); break; }
                    break;
          case "l": if (ends("ical")) { r("ic"); break; }
                    if (ends("ful")) { r(""); break; }
                    break;
          case "s": if (ends("ness")) { r(""); break; }
                    break;
    }  }

  const step5 = () =>
    {  if (k === 0) return;
       switch (b[k - 1]) 
       {  case "a": if (ends("al")) break; return;
          case "c": if (ends("ance")) break;
                    if (ends("ence")) break; return;
          case "e": if (ends("er")) break; return;
          case "i": if (ends("ic")) break; return;
          case "l": if (ends("able")) break; 
                    if (ends("ible")) break; return;
          case "n": if (ends("ant")) break;
                    if (ends("ement")) break;
                    if (ends("ment")) break;
                    if (ends("ent")) break; return;
          case "o": if (ends("ion") && j >= 0 &&
                    (b[j] === "s" || b[j] === "t")) break;
                    if (ends("ou")) break; return;
          case "s": if (ends("ism")) break; return;
          case "t": if (ends("ate")) break;
                    if (ends("iti")) break; return;
          case "u": if (ends("ous")) break; return;
          case "v": if (ends("ive")) break; return;
          case "z": if (ends("ize")) break; return;
          default:  return;
        }
        if (m() > 1) k = j;
    }

  const step6 = () =>
    {  j = k;
       if (b[k] === "e") 
       {  let a = m();
          if (a > 1 || a === 1 && !cvc(k - 1)) 
            k--;
       }
       if (b[k] === "l" && doublec(k) && m() > 1)
         k--;
    }

  step1();
  step2();
  step3();
  step4();
  step5();
  step6();

  let out = "";

  for (let i = 0; i < k + 1; i++)
    out = out + b[i];

  return out;
}

module.exports = PorterStemmer;

