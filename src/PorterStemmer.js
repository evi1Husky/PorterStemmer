export class PorterStemmer {
  constructor() 
  {  this.b = new Array();
     this.i = 0;
     this.j = 0;
     this.k = 0;
  }

  cons(i) 
  {  switch (this.b[i]) 
     {  case "a": case "e": case "i": case "o": case "u": return false;
        case "y": return i === 0 ? true : !this.cons(i - 1);
        default: return true;
     }
  }

  m() 
  {  let n = 0;
     let i = 0;
     while (true) 
     {  if (i > this.j) return n;
        if (!this.cons(i)) break; 
        i++;
     }
     i++;
     while (true) 
     {  while (true) 
        {  if (i > this.j) return n;
           if (this.cons(i)) break;
           i++;
        }
      i++;
      n++;
      while (true) 
      {  if (i > this.j) return n;
         if (!this.cons(i)) break;
         i++;
      }
      i++;
    }
  }

  vowelinstem() 
  {  let i = 0;
     for (i = 0; i <= this.j; i++) if (!this.cons(i)) return true;
     return false;
  }

  doublec(j)
  {  if (j < 1) return false;
     if (this.b[j] !== this.b[j - 1]) return false;
     return this.cons(j);
  }

  cvc(i) 
  {  if (i < 2 || !this.cons(i) || this.cons(i - 1) || !this.cons(i - 2)) 
        return false;
     let ch = this.b[i];
     if (ch === "w" || ch === "x" || ch === "y") return false;
     return true;
  }

  ends(s) 
  {  const l = s.length;
     const o = this.k - l + 1;
     if (o < 0) return false;
     for (let i = 0; i < l; i++) 
        if (this.b[o + i] !== s[i]) 
           return false;
     this.j = this.k - l;
     return true;
  }

  setto(s) 
  {  const l = s.length;
     const o = this.j + 1;
     for (let i = 0; i < l; i++) 
       this.b[o + i] = s[i];
     this.k = this.j + l;
  }

  r(s) 
  {  if (this.m() > 0) 
       this.setto(s); 
  }

  step1() 
  {  if (this.b[this.k] === "s")
     {  if (this.ends("sses")) this.k -= 2; else
        if (this.ends("ies")) this.setto("i"); else
        if (this.b[this.k - 1] !== "s") this.k--;
     }
     if (this.ends("eed")) { if (this.m() > 0) this.k--; } else
     if ((this.ends("ed") || this.ends("ing")) && this.vowelinstem()) 
     {  this.k = this.j;
        if (this.ends("at")) this.setto("ate"); else 
        if (this.ends("bl")) this.setto("ble"); else
        if (this.ends("iz")) this.setto("ize"); else
        if (this.doublec(this.k))
        {  this.k--;
           let ch = this.b[this.k];
           if (ch === "l" || ch === "s" || ch === "z") this.k++;
        }
        else if (this.m() === 1 && this.cvc(this.k)) this.setto("e");
      }
  }

  step2() 
  {  if (this.ends("y") && this.vowelinstem())
        this.b[this.k] = "i";
  }

  step3() 
  {  if (this.k === 0) return; 
     switch (this.b[this.k - 1]) 
     {  case "a": if (this.ends("ational")) { this.r("ate"); break; }
                  if (this.ends("tional")) { this.r("tion"); break; }
                  break;
        case "c": if (this.ends("enci")) { this.r("ence"); break; }
                  if (this.ends("anci")) { this.r("ance"); break; }
                  break;
        case "e": if (this.ends("izer")) { this.r("ize"); break; }
                  break;
        case "l": if (this.ends("bli")) { this.r("ble"); break; }
                  if (this.ends("alli")) { this.r("al"); break; }
                  if (this.ends("entli")) { this.r("ent"); break; }
                  if (this.ends("eli")) { this.r("e"); break; }
                  if (this.ends("ousli")) { this.r("ous"); break; }
                  break;
        case "o": if (this.ends("ization")) { this.r("ize"); break; }
                  if (this.ends("ation")) { this.r("ate"); break; }
                  if (this.ends("ator")) { this.r("ate"); break; }
                  break;
        case "s": if (this.ends("alism")) { this.r("al"); break; }
                  if (this.ends("iveness")) { this.r("ive"); break; }
                  if (this.ends("fulness")) { this.r("ful"); break; }
                  if (this.ends("ousness")) { this.r("ous"); break; }
                  break;
        case "t": if (this.ends("aliti")) { this.r("al"); break; }
                  if (this.ends("iviti")) { this.r("ive"); break; }
                  if (this.ends("biliti")) { this.r("ble"); break; }
                  break;
        case "g": if (this.ends("logi")) { this.r("log"); break; }
  }  }

  step4()
  {  switch (this.b[this.k]) 
     {  case "e": if (this.ends("icate")) { this.r("ic"); break; }
                  if (this.ends("ative")) { this.r(""); break; }
                  if (this.ends("alize")) { this.r("al"); break; }
                  break;
        case "i": if (this.ends("iciti")) { this.r("ic"); break; }
                  break;
        case "l": if (this.ends("ical")) { this.r("ic"); break; }
                  if (this.ends("ful")) { this.r(""); break; }
                  break;
        case "s": if (this.ends("ness")) { this.r(""); break; }
                  break;
  }  }

  step5() 
  {  if (this.k === 0) return;
     switch (this.b[this.k - 1]) 
     {  case "a": if (this.ends("al")) break; return;
        case "c": if (this.ends("ance")) break;
                  if (this.ends("ence")) break; return;
        case "e": if (this.ends("er")) break; return;
        case "i": if (this.ends("ic")) break; return;
        case "l": if (this.ends("able")) break; 
                  if (this.ends("ible")) break; return;
        case "n": if (this.ends("ant")) break;
                  if (this.ends("ement")) break;
                  if (this.ends("ment")) break;
                  if (this.ends("ent")) break; return;
        case "o": if (this.ends("ion") && this.j >= 0 &&
                  (this.b[this.j] === "s" || this.b[this.j] === "t")) break;
                  if (this.ends("ou")) break; return;
        case "s": if (this.ends("ism")) break; return;
        case "t": if (this.ends("ate")) break;
                  if (this.ends("iti")) break; return;
        case "u": if (this.ends("ous")) break; return;
        case "v": if (this.ends("ive")) break; return;
        case "z": if (this.ends("ize")) break; return;
        default:  return;
      }
      if (this.m() > 1) this.k = this.j;
  }

  step6()
  {  this.j = this.k;
     if (this.b[this.k] === "e") 
     {  let a = this.m();
        if (a > 1 || a === 1 && !this.cvc(this.k - 1)) 
        this.k--;
     }
     if (this.b[this.k] === "l" && this.doublec(this.k) && this.m() > 1)
     this.k--;
  }

  stem(word) 
  {  const len = word.length;
     if (len <= 2) return word;

     this.b = new Array(len);
     this.i = len;
     this.k = this.i - 1;
     this.j = 0;

     for (let i = 0; i < len; i++) 
        this.b[i] = word[i];

     this.step1();
     this.step2();
     this.step3();
     this.step4();
     this.step5();
     this.step6();

     let out = "";
     for (let i = 0; i < this.k + 1; i++)
        out = out + this.b[i];
    return out;
  }
}

