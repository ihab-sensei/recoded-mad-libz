/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  .... [noun]
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  const storyWords = rawStory.split(' ');
  console.log(storyWords);
  //all regex
  const allMatcher = /[a-z]+\[[a-z]+\]/g;
  const adjectives = /[a-z]+\[[a]+\]/g;
  const nationality = /[a-z]+\[na+\]/g;
  const person = /[a-z]+\[p+\]/g;
  const verb = /[a-z]+\[v+\]/g;
  const nouns = /[a-z]+\[[n]+\]/g;
  const numbers = /[a-z]+\[nu+\]/g;
  const shape = /[a-z]+\[[s]+\]/g;
  const foods =  /[a-z]+\[[f]+\]/g;
  // const arrayOfRegex = [adjectives, nationality, person, verb, nouns, numbers, shape, foods];
  //const matches = storyWords.filter(value => foods.test(value));
  //console.log(matches);
  const objsOfWords= [];
  for ( const word of storyWords){
    if ((word.match(allMatcher)) !== null){
      objsOfWords.push({word: word, pos:word })
    }else {
      objsOfWords.push({word: word})
    }
  }
  console.log(objsOfWords)
  /* 
  const wordObjs = storyWords.map(word => {
    //console.log(word.match(allMatcher))
    if ((word.match(allMatcher)) !== null){
      objsOfWords.push({word: word, pos:word })
    }
    }); */
  

  
  return objsOfWords; 
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const previewDiv = document.querySelector(".madLibsPreview");
    const editDiv = document.querySelector(".madLibsEdit");
    
    // word is : {word : "some word", pos: "adjective"}
    for (let word of processedStory){
      //if (pos in word)
      // if (pos in word){
      //   previewDiv.innerHTML +=`<input type="text" placeholder=${word.pos}>`
      // }
      console.log(word.pos)

      
      
      if (word.word !== "." && word.word !== ","){
        //console.log(word.word);
        // previewDiv.innerHTML += ` <span>${word.word}</span>`;
       if (word.pos){
        editDiv.innerHTML +=` <input type="text" placeholder=${word.pos}>`;
        previewDiv.innerHTML += ` <span>${word.word}</span>`;
       }else {
        previewDiv.innerHTML += ` ${word.word}`;
        editDiv.innerHTML += ` ${word.word}`;
       }
      } else if (word.word === "." || word.word === ",") {
        previewDiv.innerHTML += `${word.word}`;
        //console.log("punctuation");
      }
    }
    
    console.log('processedStory  :  '+processedStory);

  });

  