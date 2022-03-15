import './App.css';
import React from 'react';
import Header from '../components/header';

function App() {

    const [currDocTxt, setCurrDocTxt] = React.useState('')

    async function handleChange(event) {
        setCurrDocTxt(event.target.value)
        console.log(currDocTxt)
        const postData = {
          string: event.target.value
        }

        //auto complete
        const autocompletePrompt = currDocTxt.indexOf("/a")
        let lastSentence = ""

        if(autocompletePrompt != -1) {
            const textBeforePrompt = currDocTxt.substring(0, autocompletePrompt)
            console.log("test before prompt"+textBeforePrompt)
            if(textBeforePrompt.includes(".")) {
                lastSentence = textBeforePrompt.substring(textBeforePrompt.lastIndexOf("."), textBeforePrompt.length)
                console.log("last sentence before prompt" + lastSentence)
            } else lastSentence = textBeforePrompt
        }

        if(currDocTxt.includes("/a")) {
            postData.string = lastSentence


            const res = await fetch("/complete", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then((res) => res.json())
            console.log(res.newString)
            // if the new string doesn't contain the old string, add the old string to the new string
            // eg. his house -> I liked his house
            if (!res.newString.includes(lastSentence.replace("/a", ""))) {
                res.newString = lastSentence.replace("/a", "").concat(res.newString)
            }
            await setCurrDocTxt(
                 prevDocTxt => prevDocTxt.replace(lastSentence, res.newString // Get rid of duplicate . and /a, probably better way to do this than just removing last 3 chars
              ).replace(/(\r\n|\n|\r)/gm, "").replace("/a", ""));

        }

        // complete question
        const questionPattern = /\[(.*)]/g;
        const questionFound = currDocTxt.match(questionPattern);
        console.log(questionFound);
        if(Boolean(questionFound)) {
            const res = await fetch("/question", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then((res) => res.json())
            console.log(res.newString)
            await setCurrDocTxt(
              prevDocTxt => prevDocTxt.replace(questionPattern, res.newString
              ).replace(/(\r\n|\n|\r)/gm, ""));
        }
    }






    return (
        <div className="App">
        <div className="bg-slate-400">

            <Header/>


          {/*<header className="App-header">*/}
          {/*  <img src={logo} className="App-logo" alt="logo" />*/}
          {/*  <p>{!data ? "Loading..." : data}</p>*/}
          {/*</header>*/}

{/* <!-- Animate On Page Load --> */}

{document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){
        const replacers = document.querySelectorAll('[data-replace]');
        for(let i=0; i<replacers.length; i++){
            console.log('hit here2');
            let replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
            Object.keys(replaceClasses).forEach(function(key) {
                replacers[i].classList.remove(key);
                replacers[i].classList.add(replaceClasses[key]);
            });
        }
    }, 1);
})}
          <div class="duration-700 relative transform opacity-0 transition-all translate-y-12 ease-out" data-replace='{ "translate-y-12": "translate-y-0", "opacity-0": "opacity-100" }'>

            <div class="container mx-auto py-10 items-center shadow-lg">
              <div className="w-3/5 mx-auto h-screen" >
                  <input className="w-full outline-none py-10 text-4xl" type="text" placeholder="Title" />
                  <textarea value={currDocTxt} onChange={handleChange} id="message" type="message" name="message" placeholder="Write here..." className="w-full h-96 mt-2 rounded-lg text-gray-700 focus:outline-none"></textarea>
              </div>
              </div>


            </div>



            </div>
        </div>
    );
}

export default App;
