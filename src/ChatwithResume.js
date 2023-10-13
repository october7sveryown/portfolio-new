import { useState } from "react";
import React from "react";

const ChatwithResume = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isGettingData, setisGettingData]=useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisGettingData(true);

    try {
      const response = await fetch("http://localhost:3000/api/getWithBody", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.data);
        setPrompt("");
        setisGettingData(false);
      } else {
        console.error("API request failed");
        setisGettingData(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h4>Ask me anything :-)</h4>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Enter your prompt</label>
              <textarea
                class="form-control"
                value={prompt}
                onChange={handleInputChange}
                placeholder="Type your question here"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            {isGettingData ? (
        <button className="btn btn-danger" onClick={() => setisGettingData(false)}>Loading...</button>
      ) : (
        <button className="btn btn-primary" onClick={() => setisGettingData(true)}>Submit</button>
      )}
          </form>
        </div>
      </div>
    <br/>
      <div className="row">
        <h6>Response:</h6>
        <div className="col-md-6">
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatwithResume;
