import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          AI Career Chatbot
      </header>
      <div className="App-body">
        <textarea rows="30" cols="100">Please enter your question here</textarea>
        <input type="submit" value="Ask" className="ask-Button"></input>
        <p>----------------------------------------------------------------------------------------------------</p>
        <div>
          <p className="AI_responses" id="AI_responses">AI Responses to be automated to appear here on button click...</p>
        </div>
      </div>
    </div>

  );
}

export default App;
