import React, { useState } from 'react'
import Api from '../assets/api';
import "../App.css"
export default function Quotes() {

  const [quote, setQuote] = useState("Get motivation");

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
    <div>
      <h2>This is random quotes</h2>
      <button onClick={getQuote}>Generate Thought</button>
      <div>{quote}</div>
    </div>
  )
}