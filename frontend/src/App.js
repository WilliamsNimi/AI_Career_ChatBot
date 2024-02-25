import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // This function will call the LLM Api and provide a response
  const [data, setData] = useState("");
  return (
    <div className="App">
      <header className="App-header">
          <h1>Dami</h1>
          <h5>AI Career Chatbot</h5>
      </header>
      <div className="App-body">
        <div class="form-area">
          <input type="text" id="fname" name="fname" defaultValue={"Enter your first Name"}/><br/><br/>
          <input type="text" id="skills" name="skills" defaultValue={"Type your skillsets here"}/><br/><br/>
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
  var firstname = document.getElementById("fname").value
  var skills = document.getElementById("skills").value
  document.getElementById("loading").innerHTML = "loading..."
  return fetch('http://127.0.0.1:5000/query',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"query": document.getElementById('prompt').value, "firstname":firstname, "skills":skills})
  }).then((response)=> response.json())
  .then((data)=>{
    setData(data.results);
    document.getElementById("loading").innerHTML = ""
    console.log(data);
  })
  .catch((err)=>{
    console.log(err.message);
  });
}

export default App;
