import axios from 'axios';

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "a1ed86ec4b344fff8c143015130da85d";
const redirectUri = "https://eduokee.me/";
const scopes = ["user-library-read", "playlist-read-private", "ugc-image-upload"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
};

apiClient.interceptors.response.use(
  response => response, // Simply return the response if it was successful
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken(); // Function to refresh the access token
      localStorage.setItem('access_token', accessToken);
      apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  // Refresh the access token here and return the new access token
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await getRefreshToken(refreshToken); // Assuming getRefreshToken is a function that takes a refresh token and returns a new access token
  return response.accessToken;
}

export const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);

  return response;
}

export default apiClient;
