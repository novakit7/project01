import generateQuote from "../config/quoteGenrator.js";

const getQuote = async (req, res) => {
  try {
    const data = await generateQuote();

    if (!data) {
      return res.json({
        quote: "Stay consistent, success will follow.",
        author: "Ankit Verma"
      });
    }

    return res.json({
      quote: data.q,
      author: data.a
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch quote" });
  }
};

export default getQuote;