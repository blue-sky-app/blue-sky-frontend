import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import './Home.css';

export function News() {
  const [news, setNews] = useState([]);

  // This fetch is for the News
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    console.log(news);
  }, [news]);

  const fetchNews = async () => {
    const response = await axios(`${API_BASE_URL}news/`);
    setNews(response.data);
  };
  
  let headline = news[0].headline
  let text = news[0].text

  console.log(news)

  return (
    <div>
      <strong>{headline}</strong>
      <br /> {text}
    </div>
  );
}