/**
 * 
 
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
  const rex= /\[.*\]/gi;
  const  objsOfWords = storyWords.map(word=> {
    const wordOnly = word.replace(word.match(rex), "");
    let posRe = word.match(rex);
  
    //  console.log(posRe)
     
  if( posRe===null){
    console.log("noPos===null")
    return {word:wordOnly};
  }
  posRe= posRe[0];
   switch(posRe){
      case  "[na]":
      
      return {word:wordOnly, pos : "nationality" };
      case "[p]":
        return {word:wordOnly, pos : "person" };
      case "[n]":
        return {word:wordOnly, pos : "noun" };
        
      case "[v]":
      return {word:wordOnly, pos : "verb" };
      
      case  "[a]":
      return {word:wordOnly, pos : "adjective" };
      
      case  "[f]":
      return {word:wordOnly, pos : "food" };

      case  "[s]":
      return {word:wordOnly, pos : "shapes" };

      case  "[nu]":
      return {word:wordOnly, pos : "number" };

    }  
  })
  console.log(objsOfWords)




//old code
 /*  const objsOfWords= [];
  for ( const word of storyWords){
    if ((word.match(allMatcher)) !== null){
      objsOfWords.push({word: word, pos:word })
    }else {
      objsOfWords.push({word: word})
    }
  }
  console.log(objsOfWords) */
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
    const previewParagraph = document.querySelector(".previewParagraph");
    const editParagraph = document.querySelector(".editParagraph");
    
    // word is : {word : "some word", pos: "adjective"}
    for (let word of processedStory){
      //if (pos in word)
      // if (pos in word){
      //   previewDiv.innerHTML +=`<input type="text" placeholder=${word.pos}>`
      // }
      // console.log(word.pos)

      
      
      if (word.word !== "." && word.word !== ","){
        //console.log(word.word);
        // previewDiv.innerHTML += ` <span>${word.word}</span>`;
          if (word.pos){
            editParagraph.innerHTML +=` <input type="text" maxlength="20" placeholder=${word.pos} >`;//  ?? id=${word.pos}
            previewParagraph.innerHTML += ` <mark>${word.word}</mark>`;//?? id=${word.pos}
            //if word has a pos then make the input live changing
            /* const input= document.querySelector(`#${word.pos}`);
            input.addEventListener("change",(e)=>{
              let update= e.target.value;
              const span= document.querySelector(`#${word.pos}`);
              span.innerText=update;
            }) */
          }else {
            previewParagraph.innerHTML += ` ${word.word}`;
            editParagraph.innerHTML += ` ${word.word}`;
          }
      } else if (word.word === "." || word.word === ",") {
        previewParagraph.innerHTML += `${word.word}`;
        //console.log("punctuation");
      }
    }

    // console.log('processedStory  :  '+processedStory);

  });

  