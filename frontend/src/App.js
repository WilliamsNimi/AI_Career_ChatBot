import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // This function will call the LLM Api and provide a response
  const [data, setData] = useState("");
  return (
    <div className="App">
      <header className="App-header">
          AI Career Chatbot
      </header>
      <div className="App-body">
        <textarea defaultValue= "Please enter your question here" rows="30" cols="100" id="prompt"/>
        <button type="submit" className="ask-Button" onClick={()=>displayResponse(setData)}>Ask</button>
        <p>----------------------------------------------------------------------------------------------------</p>
        <div className="AI_responses" >
          <p id="AI_responses">{data}</p>
        </div>
      </div>
    </div>

  );
}

function displayResponse(setData){
  // This function sends a post request to the server with the text area value as payload.
  return fetch('http://127.0.0.1:5000/make_query',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"query": document.getElementById('prompt').value})
  }).then((response)=> response.json())
  .then((data)=>{
    setData(data.results);
    console.log(data);
  })
  .catch((err)=>{
    console.log(err.message);
  });
}

export default App;
