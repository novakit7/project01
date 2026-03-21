import React, { useState, useEffect } from 'react'
import Api from '../assets/api';
import "../App.css"

export default function Quotes() {

  const [quote, setQuote] = useState(() => {
    return localStorage.getItem("quote") || "Now or Never";
  });

  const getQuote = async () => {
    try {
      const response = await Api.get("/quote");
      const newQuote = response.data.quote + " — " + response.data.author;

      setQuote(newQuote);
      localStorage.setItem("quote", newQuote);

    } catch (error) {
      console.log(error);
      setQuote("Failed to fetch quote");
    }
  };

  // Auto fetch only if no quote saved
  useEffect(() => {
    if (!localStorage.getItem("quote")) {
      getQuote();
    }
  }, []);

  return (
    <div className="quote-box">
      <h2>⚡ Be Motivated</h2>
      <div className="quote-text">{quote}</div>
      <button onClick={getQuote}>Get Next</button>
    </div>
  )
}