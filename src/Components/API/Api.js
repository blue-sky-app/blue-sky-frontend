import axios from "axios";

// const API_BASE_URL = "http://localhost:4000";
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://blueskyapiv2.herokuapp.com";

// Creates JWT headers to add a token if present
export const headers = (token) => {
  return {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
};

// Returns true if email exists, false if it doesn't
export const userExistsByEmail = async (email) => {
  const response = await axios(`${API_BASE_URL}/userExists/`, {params: {email: email}});
  return response.data.userExists;
};

// Fetches user data from Db with .get oprtation
export const fetchUsers = async (token) => {
  const response = await axios(`${API_BASE_URL}/users/`, headers(token));
  return response.data;
};

// Fetches news data from Db with .get oprtation
export const fetchNews = async (token) => {
  const response = await axios(`${API_BASE_URL}/news/`, headers(token));
  return response.data;
};

// Fetches service data from Db with .get oprtation
export const fetchCategories = async (token) => {
  const response = await axios(`${API_BASE_URL}/servicecategories/`, headers(token));
  return response.data;
};

// Performs .put operation to update Services data on Db
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

// Performs .put operation to update News data on Db
export const updateNewsData = (newsId, info, token, execute) => {
  axios
  .put(`${API_BASE_URL}/News/` + newsId, info, headers(token))
  .then(function (response) {
    if (response.status === 200) {
      return execute;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

// performs .post operation to add new estimates to the Db
export const postEstimate = (estimateInput, token) => {
  axios
    .post(API_BASE_URL + "/estimates/", estimateInput, headers(token))
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/thankYou";
          }
        })
        .catch((error) => {
          console.log(error);
        });
}

// Fetches Estimates data from Db with .get oprtation
export const fetchEstimates = async (token) => {
  const response = await axios(`${API_BASE_URL}/estimates/`, headers(token));
  return response.data;
};

// Restricts each page where present by checking if valid token exists from login...
//  ... otherwise, it redirects user to "Login" page.
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


