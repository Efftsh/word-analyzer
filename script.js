"use strict";

const wordAnalyzer = function (word) {
  console.log(`input: ${word}`);
  //turn into lower case, remove spaces, and remove punctuation
  const wordTrimLow = word.toLowerCase().trim().replace(/\p{P}/gu, "");

  //tunr into it an array
  const wordSplit = wordTrimLow.split(/\s+/);
  const wordObj = {};

  //store it inside object and pair it with values
  for (const str of wordSplit) {
    wordObj[str] ? wordObj[str]++ : (wordObj[str] = 1);
  }

  //log the str and value and find the most frequent word
  let maxWord = "";
  let maxCount = 0;
  console.log("Output:");
  for (const [str, value] of [...Object.entries(wordObj)]) {
    console.log(`${str}: ${value}`);
    if (value > maxCount) {
      maxWord = str;
      maxCount = value;
    }
  }
  console.log(
    maxCount > 1
      ? `Most Frequent: "${maxWord}" (${maxCount} Times)`
      : `No Frequent Word`,
  );
  //log word without duplication
  console.log(`Unique words: ${Object.keys(wordObj).length}`);
  // const mostFrequent = Math.max(...Object.values(wordObj));
  // for (const [str, value] of [...Object.entries(wordObj)]) {
  //   if (value === mostFrequent)
  //     console.log(`Most Frequent: ${str} (${value} Times)`);
  // }
  // const uniqueWords = new Set([...Object.keys(wordObj)]);

  // ==========================================
  // DOM MANIPULATION ADDED BELOW
  // ==========================================
  if (typeof document !== "undefined") {
    const resultsContent = document.getElementById("results-content");
    const outputSection = document.getElementById("output-section");

    if (resultsContent && outputSection) {
      // Don't show empty results if the input was empty
      if (!wordTrimLow) {
        outputSection.style.display = "none";
        return;
      }

      outputSection.style.display = "block";

      const mostFrequentText =
        maxCount > 1 ? `"${maxWord}" (${maxCount})` : `N/A`;

      let html = `
        <div class="result-item">
          <span class="result-label">Total Unique Words</span>
          <span class="result-value">${Object.keys(wordObj).filter((k) => k).length}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Most Frequent</span>
          <span class="result-value">${mostFrequentText}</span>
        </div>
        <div class="result-item" style="flex-direction: column; border-bottom: none; margin-top: 15px;">
          <span class="result-label" style="margin-bottom: 15px;">Word Frequencies</span>
          <div class="word-list">
      `;

      // Sort words by frequency
      const sortedWords = Object.entries(wordObj)
        .filter(([str, _]) => str !== "")
        .sort((a, b) => b[1] - a[1]);

      for (const [str, value] of sortedWords) {
        html += `<span class="word-tag">${str} &times; ${value}</span>`;
      }

      html += `</div></div>`;
      resultsContent.innerHTML = html;
    }
  }
};

// Event listener for the UI analyze button
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const wordInput = document.getElementById("word-input");

    if (analyzeBtn && wordInput) {
      analyzeBtn.addEventListener("click", () => {
        const text = wordInput.value;
        if (text.trim() !== "") {
          wordAnalyzer(text);
        }
      });
    }
  });
}

// Keep original test cases
// wordAnalyzer(
//   "kamu, yang selalu... bersama dia dan kamu yang selalu bersama dia selalu!",
// );
// wordAnalyzer(
//   "Andai engkau tahu Betapa ku mencinta Selalu menjadi kanmu Isi dalam doaku     asdas      asdad",
// );
