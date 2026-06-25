const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'scratch.txt'), 'utf8');
const lines = input.split('\n').filter(l => l.trim().length > 0 && l.includes('Answer: '));

const questions = lines.map((line, idx) => {
  try {
    const questionPart = line.split(' a) ')[0].trim();
    const optionsStr = 'a) ' + line.split(' a) ')[1];
    
    const ansSplit = optionsStr.split(' Answer: ');
    const optionsRaw = ansSplit[0];
    const ansLetter = ansSplit[1].trim(); 
    
    const optA = optionsRaw.split(' a) ')[1].split(' b) ')[0].trim();
    const optB = optionsRaw.split(' b) ')[1].split(' c) ')[0].trim();
    const optC = optionsRaw.split(' c) ')[1].split(' d) ')[0].trim();
    const optD = optionsRaw.split(' d) ')[1].trim();
    
    const options = [optA, optB, optC, optD];
    
    let answerText = '';
    if (ansLetter.toLowerCase() === 'a') answerText = optA;
    if (ansLetter.toLowerCase() === 'b') answerText = optB;
    if (ansLetter.toLowerCase() === 'c') answerText = optC;
    if (ansLetter.toLowerCase() === 'd') answerText = optD;
    
    return {
      id: idx + 1,
      question: questionPart,
      options: options,
      answer: answerText,
      category: "Environmental Science",
      difficulty: "Mixed"
    };
  } catch (e) {
    console.error("Error parsing line: ", line);
    return null;
  }
}).filter(q => q !== null);

const fileContent = `export const questions = ${JSON.stringify(questions, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'questions.js'), fileContent);
console.log('Done parsing questions! Total questions:', questions.length);
