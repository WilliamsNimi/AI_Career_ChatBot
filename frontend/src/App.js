import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // This function will call the LLM Api and provide a response
  const [data, setData] = useState("");
  return (
    <div className="App">
      <header className="App-header">
          <h1>Architecture Buddy</h1>
      </header>
      <div className="App-body">
        <div class="form-area">
          <textarea defaultValue= "Please enter your question here" rows="30" cols="100" id="prompt"/>
          <button type="submit" className="ask-Button" onClick={()=>displayResponse(setData)}>Ask</button>
          <p id="loading"></p>
          <p>----------------------------------------------------------------------------------------------------</p>
          <div className="AI_responses" >
            <p id="AI_responses">{data}</p>
          </div>
        </div>
      </div>
    </div>

  );
}
function displayResponse(setData){
  // This function sends a post request to the server with the text area value as payload.
  document.getElementById("loading").innerHTML = "loading..."
  return fetch('https://sdg0vxa0k4.execute-api.us-east-1.amazonaws.com/Prod',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"query": document.getElementById('prompt').value})
  }).then((response)=> response.json())
  .then((data)=>{
    const parsedData = JSON.parse(data.body);
    setData(parsedData.response);
    document.getElementById("loading").innerHTML = ""
    console.log(data.body);
  })
  .catch((err)=>{
    console.log(err.message);
  });
}
export default App;