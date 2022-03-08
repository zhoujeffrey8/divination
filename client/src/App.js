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
              ));
        }
    }

    return (
        <div className="App">
          {/*<header className="App-header">*/}
          {/*  <img src={logo} className="App-logo" alt="logo" />*/}
          {/*  <p>{!data ? "Loading..." : data}</p>*/}
          {/*</header>*/}
          <textarea value={ currDocTxt } onChange={ handleChange }/>
          <button>Submit</button>
        </div>
    );
}


export default App;