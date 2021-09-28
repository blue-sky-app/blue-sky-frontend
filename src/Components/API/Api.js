import axios from "axios";
import { newsHeadline } from "../LocalUser/LocalUser";

// const API_BASE_URL = "http://localhost:4000/";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://blueskyapiv2.herokuapp.com/";

const fetchUser = async () => {
  const response = await axios(`${API_BASE_URL}users/`);
  return response.data;
};

const fetchNews = async () => {
  const response = await axios(`${API_BASE_URL}news/`);
  return response.data;
};

const restrictPage = () => {
  try {
    if (newsHeadline !== undefined) {
      console.log(newsHeadline);
    } else {
      window.location.href = "/login";
    }
  } catch {
    console.log("Something went terribly wrong.");
  }
};

export { API_BASE_URL, fetchUser, fetchNews, restrictPage };
