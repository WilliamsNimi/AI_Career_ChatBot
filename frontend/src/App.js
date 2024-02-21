import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // This function will call the LLM Api and provide a response
  const [data, setData] = useState({
      results: ""
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("http://127.0.0.1:5000/").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setData(data.results);
              console.log(data.results);
          }).catch((err)=>{console.log(err)})
      );
  }, []); 
  return (
    <div className="App">
      <header className="App-header">
          AI Career Chatbot
      </header>
      <div className="App-body">
        <textarea defaultValue= "Please enter your question here" rows="30" cols="100" id="prompt"/>
        <button type="submit" className="ask-Button" onClick={displayResponse}>Ask</button>
        <p>----------------------------------------------------------------------------------------------------</p>
        <div>
          <p className="AI_responses" id="AI_responses">{data.results}</p>
        </div>
      </div>
    </div>

  );
}

function displayResponse(path, data){
  console.log(JSON.stringify(document.getElementById('prompt').value))
  return fetch('http://127.0.0.1:5000/make_query'),
  {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(document.getElementById('prompt').value)
  }
}

export default App;
