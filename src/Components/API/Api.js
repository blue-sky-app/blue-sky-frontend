import axios from "axios";

// const API_BASE_URL = "http://localhost:4000";
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://blueskyapiv2.herokuapp.com";

export const headers = (token) => {
  return {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
};

export const fetchUser = async (token) => {
  const response = await axios(`${API_BASE_URL}/users/`, headers(token));
  return response.data;
};

export const fetchNews = async (token) => {
  const response = await axios(`${API_BASE_URL}/news/`, headers(token));
  return response.data;
};

export const fetchCategories = async (token) => {
  const response = await axios(`${API_BASE_URL}/servicecategories/`, headers(token));
  return response.data;
};

export const updateCategories = (catId, serviceArray, token, execute) => {
  axios
  .put(`${API_BASE_URL}/serviceCategory/` + catId, serviceArray, headers(token))
  .then(function (response) {
    if (response.status === 200) {
      return execute;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


export const restrictPage = async () => {
  let token = sessionStorage.getItem("token");
  if (token === null) {
    console.log("No token detected.");
  }
  try {
    let verified = await axios.post(`${API_BASE_URL}/validateToken`, {}, headers(token))
    if (verified.data) {
      console.log("User token verified.");
    } else {
      console.log("User token is not valid. Redirecting to login page");
      window.location.href = "/login";
    }
  } catch {
    console.log("Something went terribly wrong.");
    window.location.href = "/login";
  }
};


