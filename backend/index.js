import express from "express";
import fetch from "node-fetch";
import { SocksProxyAgent } from "socks-proxy-agent";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create a SOCKS proxy agent using TOR's default port
const agent = new SocksProxyAgent("socks5h://127.0.0.1:9050");

app.use(cors());

app.get("/api/movies", async (req, res) => {
  console.log(req.query);
  
  const url = req.query.searchTerm === "" ?
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc" :
    `https://api.themoviedb.org/3/search/movie?query=${req.query.searchTerm}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    agent, // This is the key line: uses TOR SOCKS5 proxy
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(
      "Error fetching from TMDB via TOR:",
      err.name,
      err.message,
      err
    );
    res
      .status(500)
      .json({ error: "Failed to fetch movies", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
