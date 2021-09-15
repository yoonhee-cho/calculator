const calculate = (s) => {

    if(s.length === 0) return 0;

    s = s.replace(/\s/g, '');
    s += '+';
    let index = 0;
    
    const calculateHelper = () => {
        let num = 0;
        let sum = 0;

        let prevNum = 0;
        let prevOp = '+';
        let doubleOp = '';
        let decimal = '';
        let prevDecimal = 0;

        let opSet =  new Set(['+', '-', '*', '/']);
        let acceptableSet = new Set([ '.', '(', ')']);
      
        while (index < s.length) {
            let currChar = s[index];

            if(!isNum(currChar) && !opSet.has(currChar) && !acceptableSet.has(currChar)) {
               throw new Error(`invalid input : ${currChar}`)
            }

            index += 1;

            if('0' <= s[index-1] && s[index-1]<= '9' && s[index] === '.' || s[index-1] === '.' && '0' <= s[index] && s[index]<= '9') {
                while(!opSet.has(s[index-1]) ){
                  decimal += s[index-1];
                  index++;                
                }
                prevDecimal = Number(decimal).toFixed(2);
                decimal = ''
                // I can get decimal number, but it cannot be saved in the prevDecimal variable
            } else if ('0' <= currChar && currChar <= '9') {
                 num = num * 10 + (currChar - '0');
            } else if (currChar === '(') {
                  num = calculateHelper();
            } else {
                if( opSet.has(currChar) && opSet.has(s[index]) ) {
                    if( opSet.has(s[index]) &&  opSet.has(s[index+1])) {
                    throw new Error(`this calculator only supports 2 operators`)
                    }

                    if(s[index] !== '-') {
                    throw new Error(`second operator should only be -`)
                    }

                    doubleOp += s[index-1];
                    doubleOp += s[index];

                    switch(doubleOp) {
                    case '--':
                        currChar = '+';
                        index++;
                    }
                }
            
                switch (prevOp) {
                        case '+':
                            sum += prevNum;
                            prevNum = num;
                            break;
                        case '-':
                            sum += prevNum;
                            prevNum = -num;
                            break;
                        case '*':
                            prevNum *= num;
                            break;
                        case '/':
                            prevNum = prevNum / num;
                            break;
                        default:
                            break;
                }
              
                if(currChar === ')') {
                    break;
                }

                prevOp = currChar;
                doubleOp = '';
                decimal = '';
                num = 0;
            }
         }
      return sum + prevNum;
    }

    const isNum = (s) => {
        return /[0-9]+/.test(s);
    }
    
  return calculateHelper();
};

console.log(calculate('1+2'));
// gives 3

// console.log(calculate("4*5/2"));
// gives 10

// console.log(calculate('-5+-8--11 *2')); 
// gives 9

// console.log(calculate('-.32       /.5'));
// gives -0.64

// console.log(calculate("(4-2)*3.5"));
// gives 7

// console.log(calculate('2+-+-4'));
// gives syntax error or similar

// console.log(calculate('19 + cinammon'));
// gives Invalid Input (or similar)