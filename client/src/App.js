import logo from './logo.svg';
import './App.css';
import React from 'react';
import DivBar from './DivBar'
function App() {

    const [currDocTxt, setCurrDocTxt] = React.useState('')

    async function handleChange(event) {
        setCurrDocTxt(event.target.value)
        console.log(currDocTxt)
        const postData = {
          string: event.target.value
        }

        const lastTwoChars = currDocTxt.substring(currDocTxt.length - 2)
        if(lastTwoChars.includes("/a")) {
            const lastPeriodIndex = currDocTxt.lastIndexOf('.')
            const lastSentence = currDocTxt.substring(lastPeriodIndex)

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
            await setCurrDocTxt(
              prevDocTxt => prevDocTxt.replace(lastSentence, res.newString
              ).replace(/(\r\n|\n|\r)/gm, ""));

        }


        const questionPattern = /\[(.*)\]/g;
        const questionFound = currDocTxt.match(questionPattern);
        console.log(questionFound);
        if(Boolean(questionFound)) {
            const res = await fetch("/complete", {
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
          {/*<header className="App-header">*/}
          {/*  <img src={logo} className="App-logo" alt="logo" />*/}
          {/*  <p>{!data ? "Loading..." : data}</p>*/}
          {/*</header>*/}
          <div class="container mx-auto pt-20 items-center">
              <div className="w-3/5 mx-auto" >
                  <input className="w-full outline-none py-3 text-4xl" type="text" placeholder="Title" />
                  <textarea value={currDocTxt} onChange={handleChange} id="message" type="message" name="message" placeholder="Write here..." className="w-full h-96 mt-2 rounded-lg text-gray-700 focus:outline-none"></textarea>
              </div>


        </div>
        <DivBar></DivBar>

        </div>
    );
}


export default App;