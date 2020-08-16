// 1- when we erase the text inside the input field the highlighted text is removed peranently
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
  // console.log(storyWords);
  //all regex
  const rex= /\[.*\]/gi;
  const  objsOfWords = storyWords.map(word=> {
    const wordOnly = word.replace(word.match(rex), "");
    let posRe = word.match(rex);
  
    //  console.log(posRe)
     
  if( posRe===null){
    // console.log("noPos===null")
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
  // console.log(objsOfWords)

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
    const previewParagraph = document.querySelector(".madLibsPreview");
    const editParagraph = document.querySelector(".madLibsEdit");
    
    // word is : {word : "some word", pos: "adjective"}
    for (let word of processedStory){
      //if (pos in word)
      // if (pos in word){
      //   previewDiv.innerHTML +=`<input type="text" placeholder=${word.pos}>`
      // }
      // console.log(word.pos)

      // const inputs = document.querySelectorAll("input")
      // const highlited = document.querySelectorAll("mark")
      // for (const ele of inputs) {
        
      // }
    
      
      if (word.word !== "." && word.word !== ","){
        //console.log(word.word);
          if (word.pos){
            // console.log("inside if")
            const input = document.createElement("input");
            const whiteSpace = document.createElement("span");
            whiteSpace.innerText = " ";
            input.setAttribute("maxlength", "20");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", `${word.pos}`);
            editParagraph.appendChild(whiteSpace);
            editParagraph.appendChild(input);
            
            
            

            const output = document.createElement("mark");
            output.innerText+=`${word.word}`;
            previewParagraph.appendChild(output);
            // console.log("hi",input)
            // console.log("hi", output)
            input.addEventListener("input", (e) => {
              // console.log(e.target.value)
              // console.log("hello")
               output.innerHTML = input.value;
               //update the obj word in arrOfObj
               if (input.value){
                word.word= input.value;
               }else {word.word=`${word.pos}`; output.innerText=`${word.word}`;}
               
               console.log(word)
            })


           
            

            //old code
            // editParagraph.innerHTML +=` <input type="text" maxlength="20" placeholder=${word.pos} >`;//  ?? id=${word.pos}
            // previewParagraph.innerHTML += ` <mark>${word.word}</mark>`;//?? id=${word.pos}
            //if word has a pos then make the input live changing
            /* const input= document.querySelector(`#${word.pos}`);
            input.addEventListener("change",(e)=>{
              let update= e.target.value;
              const span= document.querySelector(`#${word.pos}`);
              span.innerText=update;
            }) */
            // console.log(input)
            // const input = document.querySelector("input")
            // input.addEventListener("input", e => {
            // console.log("hello")
            // })
          }else {//normal word + space between words
            const p = document.createElement("span")
            p.innerText = ` ${word.word}`
            previewParagraph.appendChild(p)
            const p2 = document.createElement("span")
            p2.innerText = ` ${word.word}`
            editParagraph.appendChild(p2)
            // previewParagraph.innerHTML += ` ${word.word}`;
            // editParagraph.innerHTML += ` ${word.word}`;
          }
      } else  {  /* if (word.word === "." || word.word === ",") add no space before */
        // console.log(word.word)
        const p= document.createElement("span");
        p.innerText= `${word.word}`;
        previewParagraph.appendChild(p);
        
        const p2= document.createElement("span");
        p2.innerText= `${word.word}`;
        editParagraph.appendChild(p2);
        //console.log("punctuation");
      }
      
    } // THE END OF THE LOOP
    const inputFields = document.querySelectorAll("input");
      for (let i=0; i<inputFields.length; i++){
        inputFields[i].addEventListener("keypress", e=>{   
          if (e.key === "Enter" ){
            if (i===inputFields.length -1){
              inputFields[0].focus()
            } else {
            inputFields[i+1].focus();
            }
          }
        })
      }
       
    
   
      /* how to select next element with keypress, nextsibling.focus????? */
  /* editParagraph.addEventListener("keypress", e => {
      if (e.key === "Enter"){
        console.log("i was pressed")
        let input = document.querySelector("input");
        console.log(input)
          console.log("focus?")
          input.nextElementSibling.focus();
          input = input.nextElementSibling;
      }
    }) */
    // console.log('processedStory  :  '+processedStory);
    // const inputFields = document.querySelectorAll("input");
   /*  editParagraph.addEventListener("keypress", e => {
      if (e.key === "Enter"){
        console.log(e.target)
        console.log("ello")
        //console.log(e.target.nextElementSibling.nextElementSibling)
        return e.target.nextElementSibling.nextElementSibling.focus()
      }
    }) */

  });

  