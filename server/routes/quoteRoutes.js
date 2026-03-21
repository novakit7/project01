import express from "express";
import getQuote from "../controllers/QuoteController.js";

const router = express.Router();

router.get("/", getQuote);

export default router;