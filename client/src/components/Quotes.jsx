import React, { useState } from 'react'
import Api from '../assets/api';
import "../App.css"
export default function Quotes() {

  const [quote, setQuote] = useState("Now or Never");

  const getQuote = async () => {
    try {
      const response = await Api.get("/quote");
      setQuote(response.data.quote + " — " + response.data.author);
    } catch (error) {
      console.log(error);
      setQuote("Failed to fetch quote");
    }
  }

 return (
  <div className="quote-box">
    <h2>⚡ Be Motivated</h2>
     <div className="quote-text">{quote}</div>
    <button onClick={getQuote}>Get Next</button>
   
  </div>
)
}