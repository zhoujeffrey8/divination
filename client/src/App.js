import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

    const [currDocTxt, setCurrDocTxt] = React.useState('')

    async function handleChange(event) {
        setCurrDocTxt(event.target.value)
        console.log(currDocTxt)
        const postData = {
          string: event.target.value
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
          <div class="container mx-auto pt-20">
          <input className="w-full p-2 outline-none py-3 text-4xl px-3" type="text" placeholder="Title" />
        <textarea value={ currDocTxt } onChange={ handleChange } id="message" type="message" name="message" placeholder="Write here..." class=" w-screen h-screen p-3 mt-2 rounded-lg text-gray-700 focus:outline-none"></textarea>
        </div>
        </div>
    );
}


export default App;