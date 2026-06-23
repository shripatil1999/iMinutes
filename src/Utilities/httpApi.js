import axios from "axios";
// https://github.com/axios/axios?tab=readme-ov-file
const baseURL = "https://momtestapi.ipumpnet.com/common/";

const httpApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "custom-header",
  },
});

// Request Interceptor
httpApi.interceptors.request.use(
  (config) => {
    //https://stackoverflow.com/questions/51778456/how-to-add-global-loading-spin-effect-in-axios-interceptor-for-a-react-project
    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    // document.body.classList.add("loading-indicator");
    document.getElementById("root").classList.add("loading-indicator");
    document.getElementById("loader-root").classList.add("loading-overlay");

    // Modify the request config here (e.g., add headers, authentication tokens)
    const userData = sessionStorage.getItem("userData"); // get user data from session storage
    if (userData) {
      const parsedData = JSON.parse(userData); // parse the user data
      const accessToken = parsedData[0].token;
      // ** If token is present add it to request's Authorization Header
      if (accessToken) {
        if (config.headers)
          config.headers.Authorization = `Bearer ${accessToken}`;
        // config.headers.token = accessToken;
      }
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

// Response interceptor
httpApi.interceptors.response.use(
  (response) => {
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    // setTimeout(() => {
    // document.body.classList.remove("loading-indicator");
    document.getElementById("root").classList.remove("loading-indicator");
    document.getElementById("loader-root").classList.remove("loading-overlay");
    // }, 5000);

    return response;
  },
  (error) => {
    // document.body.classList.remove("loading-indicator");
    document.getElementById("root").classList.remove("loading-indicator");
    document.getElementById("loader-root").classList.remove("loading-overlay");
    console.log("Response interceptor ", error);
    // Handle response errors here
    handleError(error);
    // return Promise.reject(error);
  }
);

const fetchDataAxios = async (endpoint) => {
  const response = await httpApi.get(endpoint);
  return response.data;
};

const postDataAxios = async (endpoint, data) => {
  endpoint = baseURL + endpoint;
  const response = await httpApi.post(endpoint, data);
  return response.data;
};

function handleError(httpError) {
  if (httpError.code === "ERR_NETWORK") {
    // console.log("ERR_NETWORK", httpError);
    throw new Error("Network Error. Please check your internet connection.");
  }

  if (httpError.response && httpError.response.status) {
    const status = httpError.response.status;
    switch (status) {
      case 400:
        throw new Error("400 Error - Bad Request");
      case 401:
        throw new Error("401 Error - Unauthorized");
      case 403:
        throw new Error("403 Error - Forbidden");
      case 404:
        throw new Error("404 Error - Resource Not Found");
      case 500:
        console.log("500", httpError.response.data.title);

        throw httpError.response.data.title;
      // Add more cases as needed
      default:
        throw new Error(httpError.message);
    }
  } else {
    throw new Error(
      "Error Fetching Data. " + httpError.message ? httpError.message : ""
    );
  }
}

// handleError(httpError) {
//   if (httpError.code === 'ERR_NETWORK') {
//     console.log('ERR_NETWORK', httpError)
//     throw new Error('Net Work Errro Check Internet');
//   }
//   if (httpError.response.status === 404) {
//     throw new Error('404 Error - Resource Not Found');
//   } else if (httpError.response.status === 500) {
//     throw new Error(httpError.response.data.title);
//   } else {
//     throw new Error('Error Fetching Data');
//   }
// };

export { fetchDataAxios, postDataAxios };
