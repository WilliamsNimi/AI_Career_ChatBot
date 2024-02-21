import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // This function will call the LLM Api and provide a response
  const [data, setData] = useState({
      results: ""
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from flask server
      fetch("http://127.0.0.1:5000/make_query").then((res) =>
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
  // This function sends a post request to the server with the text area value as payload.
  return fetch('http://127.0.0.1:5000/make_query',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"query": document.getElementById('prompt').value})
  }).then((response)=> response.json())
  .then((data)=>{console.log(data);
  })
  .catch((err)=>{
    console.log(err.message);
  });
}

export default App;
