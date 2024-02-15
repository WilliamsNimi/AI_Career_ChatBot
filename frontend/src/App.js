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
      fetch("/").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setData(data);
              console.log(data);
          })
      );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
          AI Career Chatbot
      </header>
      <div className="App-body">
        <textarea rows="30" cols="100" id="prompt">Please enter your question here</textarea>
        <button type="submit" className="ask-Button" >Ask</button>
        <p>----------------------------------------------------------------------------------------------------</p>
        <div>
          <p className="AI_responses" id="AI_responses">{data.results}</p>
        </div>
      </div>
    </div>

  );
}

/*function displayResponse(){
  
  document.getElementById("AI_responses").innerText = ""
} */

export default App;
