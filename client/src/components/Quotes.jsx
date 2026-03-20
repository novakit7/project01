import React, { useState } from 'react'

export default function Quotes() {
    const [quote, setQuote] = useState("get motivation")
    const data = [
            {
                "q": "Adventure is worthwhile in itself.",
                "a": "Amelia Earhart",
                "h": "<blockquote>&ldquo;Adventure is worthwhile in itself.&rdquo; &mdash; <footer>Amelia Earhart</footer></blockquote>"
            }
           ]
    const getThought = async () => {
        setQuote(data[0].q + " — " + data[0].a);
    };
  return (
    <div>
      this is random quotes 
      <button onClick={getThought}>gerate thought</button>
      <div>
        {quote}
      </div>
    </div>
  )
}
