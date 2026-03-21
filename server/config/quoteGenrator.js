import axios from 'axios';
const generateQuote =async ()=> {
    try {
    const res = await axios.get("https://zenquotes.io/api/random");
    return res.data[0];
  } catch (err) {
    console.error(err);
    return  null;
  }
};

export default generateQuote;